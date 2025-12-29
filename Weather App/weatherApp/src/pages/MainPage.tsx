import Panel from '../components/Panel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Display from '../components/Display';
import { fetchWeatherData} from '../API/weatherforecast';  


//WE PUT THIS IN TYPE FOLDER LATER
type geoloc={
    city:string,
    latitude:number,
    longitude:number,
    elevation:number,
    timezone:string,
    country:string
}

// we later convert this to a proper type file and interface
type WeatherData = {
  current: {
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  hourly: {
    time: Date[];
    temperature_2m: number[];
    temperature_80m: number[];
    precipitation_probability: number[];
  };
  daily: {
    time: Date[];
    sunrise: Date[];
    sunset: Date[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};
  



function MainPage() {

    const [city,setCity]=useState<string>("")
    const [data,setData]=useState<geoloc|null>(null)
    const [weatherData,setWeatherData]=useState<any>(null)
    

    const geolocApi= async(city:string)=>{
        const api:string=`${city} ` //api to return geolocation - coordinates of city &more

        const response= await axios.get<geoloc>(api)
        // .then((response)=>{
        //     console.log(response.data)})
        // .catch((err)=>{console.log(err)})
        
        if(response.data)
            {    
                setData(response.data)
            }
    }

    const handleSearch=(value:string)=>{
        setCity(value)
        console.log(city)
        geolocApi(value)
    }

    //extracting the lat n long frm data 
    const lat= data?.latitude
    const long= data?.longitude

    useEffect(()=>{
        if(!lat || !long){
          console.log("Coordinates have not been received properly")
        }

        const callFetchWeatherData = async()=>{
            const weatherData=await fetchWeatherData(lat!,long!) 
            console.log(weatherData)
            
          }
          
        callFetchWeatherData()
    },[lat,long])
    


  return (
    <div>
      <h1>Welcome to the Weather App</h1>
      <Panel onSearch={handleSearch}/>

       {data && <Display data={data}/>}
    </div>
  );
}
export default MainPage;