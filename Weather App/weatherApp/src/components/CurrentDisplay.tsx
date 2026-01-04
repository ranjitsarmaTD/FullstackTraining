
import MetricCard from "../component_utils/MetricCard";
import { useState } from "react";



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

type CurrentDisplayProps = {
  currentWeather: currentWeatherUI;
};


const CurrentDisplay = ({ currentWeather }: CurrentDisplayProps) => {
    const [unit,setUnit]=useState<"celsius" | "fahrenheit">("celsius")
    


    const sliceTimeStamp=(timeStamp:string):string=>{
        // const date = new Date(timeStamp)
        // return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        return timeStamp.substring(11,16) 
    }

    //seperating the metric card values
    const metrics = [
  { label: 'Humidity', value: currentWeather.humidity.toFixed(1), unit: '%' },
  { label: 'Wind', value: currentWeather.windSpeed.toFixed(1), unit: 'km/h' },
  { label: 'Sunrise', value: sliceTimeStamp(currentWeather.sunrise) },
  { label: 'Sunset', value: sliceTimeStamp(currentWeather.sunset) },
    ]


    const convertToFahrenheit =(celsius:number):number=>{
        return (celsius * 9/5) + 32
    }

    //abity to convert btwn celsius and fahrenheit can be added late: done
    //need to handleclick for the T button: take temp value and convert to farenheit: done

    

    return (
        <div className="current-display-box">
            <div className="temp-unit-toggle">
                
                <h2>{unit === "celsius" ? 
                    currentWeather.temperature.toFixed(1)+" °C" 
                    : convertToFahrenheit(currentWeather.temperature).toFixed(1) + " °F"}</h2>
                <button onClick={()=>setUnit(unit==='celsius'?'fahrenheit':'celsius')}>T</button>
            </div>
            <h2>{currentWeather.city}, {currentWeather.country}</h2>
            <h2>Min: {unit === "celsius" ? 
                    currentWeather.minTemp.toFixed(1)+" °C" 
                    : convertToFahrenheit(currentWeather.minTemp).toFixed(1) + " °F"}  Max: {unit === "celsius" ? 
                    currentWeather.maxTemp.toFixed(1)+" °C" 
                    : convertToFahrenheit(currentWeather.maxTemp).toFixed(1) + " °F"}</h2>
            <div className="metrics-container">
                {metrics.map((metric) =>(
                    <MetricCard
                        key={metric.label}
                        label={metric.label}
                        value={metric.value}
                        unit={metric.unit}
                    />
                ))}
            </div>
        </div> 
    )
}   

export default CurrentDisplay;