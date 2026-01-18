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
        <div className="daily-card">
            <p style={{fontSize:"1.5em",fontWeight:"250",fontStyle:"italic",fontFamily:"Georgia"}}> {time.toLocaleDateString("en-IN",{
                 weekday: "short",
                 day: "numeric",
                 month: "short",
                })}</p>

            <div style={{textAlign:"left",paddingLeft:"10px"}}>
                <p style={{fontSize:"1.2em"}}>Sunrise: {sunrise.toLocaleTimeString()}</p>
                <p style={{fontSize:"1.2em"}}>Sunset:   {sunset.toLocaleTimeString()}</p>
                <p style={{fontSize:"1.2em"}}>Max Temp:  {temperature_2m_max?.toFixed(1)}°C</p>
                <p style={{fontSize:"1.2em"}}>Min Temp: {temperature_2m_min?.toFixed(1)}°C</p>
                <p style={{fontSize:"1.2em"}}>Rain Chance: {precipitation_probability_max}%</p>
            </div>
        </div>
    )
}

export default DailyCard;   