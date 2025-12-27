import { useState } from "react";
type DisplayProps={
    data:{
          city:string,
         latitude:number,
         longitude:number,
         elevation:number,
         timezone:string,
         country:string
    }
}
//conditional tabing
//component or conditional content render
//decide whether to show current weather as complete different component or part of display component

function Display({ data }: DisplayProps) {

    const [activeTab,setActiveTab]=useState<"hourly" | "daily">("hourly")


    return (
        <div>
            <h2>Data retrieve</h2>
            <div className="display-tabs">
                <button onClick={()=>setActiveTab("hourly")}>Hourly</button>
                <button onClick={()=>setActiveTab("daily")}>Daily</button>

            </div>
            <div className="display-content">
                {activeTab==="hourly" ? (
                    <div className="content-hourly"></div>
                )
                :(
                    <div className="content-daily"></div>
                )
                }
            </div>
        </div>
    )
}

export default Display;