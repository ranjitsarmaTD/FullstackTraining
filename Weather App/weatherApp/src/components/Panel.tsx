import { useState } from "react";


// type weatherApi={
//     city:string,
//     temp: number
// }

type PanelProps={
    onSearch:(value:string)=>void
}




const Panel = ({onSearch}:PanelProps) => {
    const [city,setCity]=useState<string|undefined>();
    
    
    const handleClick=()=>{
        console.log("Panel Pg: Searching for city:",city);
        onSearch(city ||"")//prop function. Callback to parent page.
        
    }




    return <div>
        <label> Enter your City name:</label>
        <input type="text" 
            placeholder="Eg: Guwahati" 
            value={city}
            onChange={(e)=>{setCity(e.target.value)}} />

        <button onClick={handleClick}>Search</button>
        


    </div>
}

export default Panel;