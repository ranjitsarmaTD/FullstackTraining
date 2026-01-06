type DailyCardProps={
    time: Date;
    sunrise: Date;        
    sunset: Date;   
    temperature_2m_max: number|null;
    temperature_2m_min: number|null;
    precipitation_probability_max: number|null;
}

const DailyCard = ({ time, sunrise, sunset, temperature_2m_max, temperature_2m_min, precipitation_probability_max }: DailyCardProps) => {
    return (
        <div>
            <p> {time.toLocaleDateString("en-IN",{
                 weekday: "short",
                 day: "numeric",
                 month: "short",
                })}</p>

            <p>Sunrise: {sunrise.toLocaleTimeString()}</p>
            <p>Sunset: {sunset.toLocaleTimeString()}</p>
            <p>Max Temperature: {temperature_2m_max?.toFixed(1)}°C</p>
            <p>Min Temperature: {temperature_2m_min?.toFixed(1)}°C</p>
            <p>Precipitation Probability: {precipitation_probability_max}%</p>

        </div>
    )
}

export default DailyCard;   