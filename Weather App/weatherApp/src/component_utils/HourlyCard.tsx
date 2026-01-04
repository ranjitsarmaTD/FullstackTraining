type HourlyCardProps={
    time: Date
    temperature_2m: number|null
    // temperature_80m: number|null
    precipitation_probability: number|null
}

const HourlyCard = ({time, temperature_2m, precipitation_probability}: HourlyCardProps) => {
    return (
        <div>
            <p> {time.toLocaleTimeString()}</p>
            <p>Temperature: {temperature_2m?.toFixed(1)}°C</p>
            <p>Precipitation Probability: {precipitation_probability}%</p>
        </div>
    )
}

export default HourlyCard;