import { useState } from "react";
import CurrentDisplay from "./CurrentDisplay";
import HourlyDisplay from "./HourlyDisplay";
import DailyDisplay from "./DailyDisplay";  

type DisplayProps={
    weatherData:{
        current: {
                    time: Date;
                    temperature_2m: number;
                    relative_humidity_2m: number;
                    wind_speed_10m: number;
                    weather_code: number;
                };
        hourly: {
                    time: Date[];
                    temperature_2m: number[]|Float32Array|null;
                    // temperature_80m: number[]|Float32Array|null;
                    precipitation_probability: number[]|Float32Array|null;
        };
        daily: {
                time: Date[];
                sunrise: Date[];
                sunset: Date[];
                temperature_2m_max: number[]|Float32Array|null;
                temperature_2m_min: number[]|Float32Array|null;
                precipitation_probability_max: number[]|Float32Array|null;
              };
    }


    locData:{
        name:string,
        latitude:number,
        longitude:number,
        elevation:number,
        timezone:string,
        country:string
  }
}


//type for currentweather data
type currentWeatherUI={
  city:string,
  country:string,
  temperature: number
  weatherCode: number
  humidity: number
  windSpeed: number
  minTemp: number
  maxTemp: number
  sunrise: string
  sunset: string
}


// type hourlyDataUI={
//     time: Date[];
//     temperature_2m: number[]|Float32Array|null;
//     temperature_80m: number[]|Float32Array|null;
//     precipitation_probability: number[]|Float32Array|null;
// }



//conditional tabing -- done
//component or conditional content render ---done
//decide whether to show current weather as complete different component or part of display component--decided
//dividing the data obtained and send as props to respective components--


function Display({ weatherData, locData }: DisplayProps) {

    const [activeTab,setActiveTab]=useState<"hourly" | "daily">("hourly")

    const currentWeather:currentWeatherUI={
        city: locData.name,
        country: locData.country,
        temperature: weatherData.current.temperature_2m,
        weatherCode: weatherData.current.weather_code,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        minTemp: weatherData.daily?.temperature_2m_min?.[0] ?? 0,
        maxTemp: weatherData.daily?.temperature_2m_max?.[0] ?? 0,
        sunrise: weatherData.daily.sunrise[0].toISOString(),
        sunset: weatherData.daily.sunset[0].toISOString()
    }

    const hourlyData:DisplayProps["weatherData"]["hourly"]={
        time: weatherData.hourly.time,
        temperature_2m: weatherData.hourly.temperature_2m,
        // temperature_80m: weatherData.hourly.temperature_80m,
        precipitation_probability: weatherData.hourly.precipitation_probability
    }


    return (
        <div>
            <h2>Data retrieve</h2>

            <div className="current-display">{weatherData&& locData && <CurrentDisplay currentWeather={currentWeather}  />}</div>

            <div className="display-tabs">
                <button onClick={()=>setActiveTab("hourly")}>Hourly</button>
                <button onClick={()=>setActiveTab("daily")}>Daily</button>

            </div>
            <div className="display-content">
                {activeTab==="hourly" ? (
                    <div className="content-hourly">
                        <HourlyDisplay hourlyData={hourlyData} />
                    </div>
                )
                :(
                    <div className="content-daily">
                        <DailyDisplay />
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Display;