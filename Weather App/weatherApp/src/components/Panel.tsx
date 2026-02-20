import { useState } from "react";
import  "../CSS/mainpage.css";


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




    return <div className="display-panel">
        <label> Enter your City name:</label>
        <input style={{width:'30%',  
                       borderRadius:'5px',
                       fontSize:'1.5em',
                       fontFamily:'times-new-roman',
                       padding:'10px',
                       border:'2px solid #00aeff8c',
                    //    boxShadow:'0px 0px 10px orange',
                       textAlign:'center',
                       minWidth:'20%',
                       transition:'box-shadow 0.4s ease'
                
            
                        
        }} type="text" 
            placeholder="Eg: Guwahati" 
            value={city}
            onChange={(e)=>{setCity(e.target.value)}} />

        <button className="search-button" onClick={handleClick}>Search</button>
        


    </div>
}

export default Panel;