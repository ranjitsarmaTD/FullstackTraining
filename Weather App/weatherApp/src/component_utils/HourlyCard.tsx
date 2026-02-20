type HourlyCardProps = {
  time: Date;
  temperature_2m: number | null;
  // temperature_80m: number|null
  precipitation_probability: number | null;
};

const HourlyCard = ({
  time,
  temperature_2m,
  precipitation_probability,
}: HourlyCardProps) => {
  return (
    <div className="hourly-card">
      <p style={{fontSize:"1.5em",fontWeight:"250",fontStyle:"italic",fontFamily:"Georgia"}}>
        {" "}
        {time.toLocaleTimeString([], {
          hour: "numeric",
          hour12: true,
        })}
      </p>
      <p style={{fontSize:"1.2em"}}>Temp: {temperature_2m?.toFixed(1)}°C</p>
      <p style={{fontSize:"1.2em"}}>Rain chance: {precipitation_probability}%</p>
    </div>
  );
};

export default HourlyCard;
