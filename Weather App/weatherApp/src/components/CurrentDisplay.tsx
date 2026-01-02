
type CurrentWeatherUI = {
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  minTemp: number;
  maxTemp: number;
  sunrise: string;
  sunset: string;
};

type CurrentDisplayProps = {
  currentWeather: CurrentWeatherUI;
};


const CurrentDisplay = ({ currentWeather }: CurrentDisplayProps) => {

    return (
        <div> Today's Data </div> 
    )
}   

export default CurrentDisplay;