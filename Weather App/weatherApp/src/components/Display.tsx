import { useState } from "react";
import CurrentDisplay from "./CurrentDisplay";
import HourlyDisplay from "./HourlyDisplay";
import DailyDisplay from "./DailyDisplay";  

type DisplayProps={
    data:{
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
    }
}
//conditional tabing -- done
//component or conditional content render ---done
//decide whether to show current weather as complete different component or part of display component--decided
//dividing the data obtained and send as props to respective components--


function Display({ data }: DisplayProps) {

    const [activeTab,setActiveTab]=useState<"hourly" | "daily">("hourly")


    return (
        <div>
            <h2>Data retrieve</h2>

            <div className="current-content">{data && <CurrentDisplay />}</div>

            <div className="display-tabs">
                <button onClick={()=>setActiveTab("hourly")}>Hourly</button>
                <button onClick={()=>setActiveTab("daily")}>Daily</button>

            </div>
            <div className="display-content">
                {activeTab==="hourly" ? (
                    <div className="content-hourly">
                        <HourlyDisplay />
                    </div>
                )
                :(
                    <div className="content-daily">
                        <DailyDisplay />
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Display;