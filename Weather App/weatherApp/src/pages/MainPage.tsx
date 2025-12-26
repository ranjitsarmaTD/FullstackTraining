import Panel from '../components/Panel';
import { useState } from 'react';
import axios from 'axios';

type weather={
    city:string,
    temp:number
}



function MainPage() {

    const [city,setCity]=useState<string>("")
    const [data,setData]=useState<weather|null>(null)
    

    const callApi= async()=>{
        const api:string="  "

        const response= await axios.get(api)
        // .then((response)=>{
        //     console.log(response.data)})
        // .catch((err)=>{console.log(err)})
        if(!response.data)
            {
                setData(response.data)
            }
    }

    const handleSearch=(value:string)=>{
        setCity(value)
        console.log(city)
        callApi()
    }



  return (
    <div>
      <h1>Welcome to the Weather App</h1>
      <Panel onSearch={handleSearch}/>
    </div>
  );
}
export default MainPage;