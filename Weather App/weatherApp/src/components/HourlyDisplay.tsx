import HourlyCard from "../component_utils/HourlyCard";
type HourlyDisplayProps = {
  hourlyData: {
    time: Date[];
    temperature_2m: number[] | Float32Array | null;
    // temperature_80m: number[]|Float32Array|null;
    precipitation_probability: number[] | Float32Array | null;
  };
};

const HourlyDisplay = ({ hourlyData }: HourlyDisplayProps) => {
    console.log("HourlyDisplay: received hourlyData:",hourlyData);
  
    return (
    <div>
      {hourlyData.time.slice(0, 12).map((time, index) => (
        <HourlyCard
          key={index}
          time={time}
          temperature_2m={hourlyData.temperature_2m?.[index] ?? null}
          precipitation_probability={
            hourlyData.precipitation_probability?.[index] ?? null
          }
        />
      ))}
    </div>
  );
};
export default HourlyDisplay;
