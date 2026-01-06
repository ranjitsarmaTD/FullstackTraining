import DailyCard from "../component_utils/DailyCard";


type dailyDataProps={
    dailyData:{
        time: Date[];
        sunrise: Date[];        
        sunset: Date[]; 
        temperature_2m_max: number[]|Float32Array|null;
        temperature_2m_min: number[]|Float32Array|null;
        precipitation_probability_max: number[]|Float32Array|null;
    }
}


const DailyDisplay = ({ dailyData }: dailyDataProps) => {



    return (
        <div> {dailyData && dailyData.time.map((time,index)=>(
            <DailyCard
              key={index}
              time={time}  
                sunrise={dailyData.sunrise?.[index] ?? null}    
                sunset={dailyData.sunset?.[index] ?? null}
                temperature_2m_max={dailyData.temperature_2m_max?.[index] ?? null}
                temperature_2m_min={dailyData.temperature_2m_min?.[index] ?? null}
                precipitation_probability_max={dailyData.precipitation_probability_max?.[index] ?? null}
            />
        ))} </div> 
    )
}       
export default DailyDisplay;