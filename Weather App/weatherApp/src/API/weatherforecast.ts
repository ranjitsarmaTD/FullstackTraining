import { fetchWeatherApi } from "openmeteo";



//I copied the given ts script from open meteo doc and converted into an exportable function
const fetchWeatherData = async (lat: number, long: number) => {
	const params = {
	latitude: lat,
	longitude: long,
	daily: ["sunrise", "sunset", "temperature_2m_max", "temperature_2m_min", "precipitation_probability_max"],
	hourly: ["temperature_2m", "temperature_80m", "precipitation_probability"],
	current: ["relative_humidity_2m", "wind_speed_10m", "weather_code", "temperature_2m"],
	timezone: "auto",
	forecast_hours: 24,
	past_hours: 12,
    };
	const url = "https://api.open-meteo.com/v1/forecast";


	const responses = await fetchWeatherApi(url, params);

	// Process first location. Add a for-loop for multiple locations or weather models
	const response = responses[0];

	// Attributes for timezone and location
	const latitude = response.latitude();
	const longitude = response.longitude();
	const elevation = response.elevation();
	const timezone = response.timezone();
	const timezoneAbbreviation = response.timezoneAbbreviation();
	const utcOffsetSeconds = response.utcOffsetSeconds();

	console.log(
		`\nCoordinates: ${latitude}°N ${longitude}°E`,
		`\nElevation: ${elevation}m asl`,
		`\nTimezone: ${timezone} ${timezoneAbbreviation}`,
		`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
	);

	const current = response.current()!;
	const hourly = response.hourly()!;
	const daily = response.daily()!;

	// Define Int64 variables so they can be processed accordingly
	const sunrise = daily.variables(0)!;
	const sunset = daily.variables(1)!;

	// Note: The order of weather variables in the URL query and the indices below need to match!
	const weatherData = {
		current: {
			time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
			relative_humidity_2m: current.variables(0)!.value(),
			wind_speed_10m: current.variables(1)!.value(),
			weather_code: current.variables(2)!.value(),
			temperature_2m: current.variables(3)!.value(),
		},
		hourly: {
			time: Array.from(
				{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
				(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
			),
			temperature_2m: hourly.variables(0)!.valuesArray(),
			temperature_80m: hourly.variables(1)!.valuesArray(),
			precipitation_probability: hourly.variables(2)!.valuesArray(),
		},
		daily: {
			time: Array.from(
				{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
				(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
			),
			// Map Int64 values to according structure
			sunrise: [...Array(sunrise.valuesInt64Length())].map(
				(_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
			),
			// Map Int64 values to according structure
			sunset: [...Array(sunset.valuesInt64Length())].map(
				(_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
			),
			temperature_2m_max: daily.variables(2)!.valuesArray(),
			temperature_2m_min: daily.variables(3)!.valuesArray(),
			precipitation_probability_max: daily.variables(4)!.valuesArray(),
		},
	};

	// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
	console.log(
		`\nCurrent time: ${weatherData.current.time}\n`,
		`\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
		`\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
		`\nCurrent weather_code: ${weatherData.current.weather_code}`,
		`\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
	);
	console.log("\nHourly data:\n", weatherData.hourly)
	console.log("\nDaily data:\n", weatherData.daily)
	
	
	
	
	return weatherData;
}

export { fetchWeatherData };