import Panel from "../components/Panel";
import { useEffect, useState } from "react";
import axios from "axios";
import Display from "../components/Display";
import { fetchWeatherData } from "../API/weatherforecast";
import Header from "../components/Header";
import "../CSS/mainpage.css";

//WE PUT THIS IN TYPE FOLDER LATER
type geoLocType = {
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  country: string;
};
type geoloc = {
  results: geoLocType[];
};

// we later convert this to a proper type file and interface
type WeatherDataType = {
  current: {
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  hourly: {
    time: Date[];
    temperature_2m: number[] | Float32Array | null;
    temperature_80m: number[] | Float32Array | null;
    precipitation_probability: number[] | Float32Array | null;
  };
  daily: {
    time: Date[];
    sunrise: Date[];
    sunset: Date[];
    temperature_2m_max: number[] | Float32Array | null;
    temperature_2m_min: number[] | Float32Array | null;
    precipitation_probability_max: number[] | Float32Array | null;
  };
};

function MainPage() {
  const [city, setCity] = useState<string>("");
  const [data, setData] = useState<geoLocType | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const geolocApi = async (city: string) => {
    console.log("Main Page :In geoloc API with city:", city); //debugging

    if (data) {
      setData(null);
      setError(null);
    }
    if(city.trim()===""){
        setError("Please enter a city name first");
        return;
    }

    const api: string = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json `; //api to return geolocation - coordinates of city &more
    
    
    setError(null);
    setLoading(true); // show loading from loc search
    try {
      const response = await axios.get<geoloc>(api);

      if (!response.data || response.data.results.length === 0) {
        console.error("No results found for the specified city.");
        setData(null);
        setError("No results found for the specified city.");
        setLoading(false);
        return;
      }

      setError(null);
      setData(response.data.results[0]);
      
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
      setError("Error fetching geolocation data");
      setLoading(false);
      setData(null);
    }
  };

  const handleSearch = (value: string) => {
    setCity(value);
    console.log(city);
    geolocApi(value);
  };

  //extracting the lat n long frm data
  // console.log("Geolocation data in MainPage:",data?.results.name)
  const lat = data?.latitude;
  const long = data?.longitude;
  console.log("Latitude:", lat, "Longitude:", long);

  useEffect(() => {
    if (!lat || !long) {
      console.log("Coordinates have not been received properly");
    }

    const callFetchWeatherData = async () => {
      if (weatherData) {
        setWeatherData(null); //reset existing data
      }

      try {
        const wdata: WeatherDataType = await fetchWeatherData(lat!, long!);
        setWeatherData(wdata);
        setLoading(false);
        setError(null);
      } catch (error) {

        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data");
        setLoading(false);
        setWeatherData(null);

      }
    };

    callFetchWeatherData();
  }, [lat, long, city]);

  return (
    <div className="mainpage-container">
      <Header/>

      <Panel onSearch={handleSearch} />
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {loading && <p>Loading weather...</p>}
      
      {weatherData && data && (
        <Display weatherData={weatherData} locData={data} />
      )}
    </div>
  );
}
export default MainPage;
