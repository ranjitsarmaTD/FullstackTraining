import Panel from '../components/Panel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Display from '../components/Display';
import { fetchWeatherData} from '../API/weatherforecast';  


//WE PUT THIS IN TYPE FOLDER LATER
type geoLocType={
  
    name:string,
    latitude:number,
    longitude:number,
    elevation:number,
    timezone:string,
    country:string
}
type geoloc={
  results:geoLocType[]
}

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
    temperature_2m: number[]|Float32Array|null;
    temperature_80m: number[]|Float32Array|null;
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
};
  



function MainPage() {

    const [city,setCity]=useState<string>("")
    const [data,setData]=useState<geoLocType|null>(null)
    const [weatherData,setWeatherData]=useState<WeatherDataType|null>(null)
    

    const geolocApi= async(city:string)=>{
      console.log("Main Page :In geoloc API with city:",city)
        const api:string=`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json ` //api to return geolocation - coordinates of city &more

        const response= await axios.get<geoloc>(api)
        // .then((response)=>{
        //     console.log(response.data)})
        // .catch((err)=>{console.log(err)})
        
        
        if(response.data)
            {   console.log("Main Page: Geolocation data received:",response.data.results)
                setData(response.data.results[0]) //setting the first result from array of results
            }
          else{
            console.log("No data found for the specified city",response.data)
          }
    }

    const handleSearch=(value:string)=>{
        setCity(value)
        console.log(city)
        geolocApi(value)
    }

    //extracting the lat n long frm data 
    // console.log("Geolocation data in MainPage:",data?.results.name) 
    const lat= data?.latitude
    const long= data?.longitude
    console.log("Latitude:",lat,"Longitude:",long)

    useEffect(()=>{
        if(!lat || !long){
          console.log("Coordinates have not been received properly")
        }

        const callFetchWeatherData = async()=>{
            const wdata: WeatherDataType = await fetchWeatherData(lat!,long!) 
            setWeatherData(wdata)
            
          }
          
        callFetchWeatherData()
    },[lat,long])
    


  return (
    <div>
      <h1>Welcome to the Weather App</h1>
      <Panel onSearch={handleSearch}/>

       {weatherData && data&& <Display weatherData={weatherData} locData={data}/>}
    </div>
  );
}
export default MainPage;