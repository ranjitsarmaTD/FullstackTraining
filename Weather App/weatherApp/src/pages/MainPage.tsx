import Panel from '../components/Panel';
import { useState } from 'react';
import axios from 'axios';
import Display from '../components/Display';


//WE PUT THIS IN TYPE FOLDER LATER
type geoloc={
    city:string,
    latitude:number,
    longitude:number,
    elevation:number,
    timezone:string,
    country:string
}



function MainPage() {

    const [city,setCity]=useState<string>("")
    const [data,setData]=useState<geoloc|null>(null)
    

    const geolocApi= async(city)=>{
        const api:string=`${city} ` //api to return geolocation - coordinates of city &more

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
        geolocApi(value)
    }



  return (
    <div>
      <h1>Welcome to the Weather App</h1>
      <Panel onSearch={handleSearch}/>

       {data && <Display data={data}/>}
    </div>
  );
}
export default MainPage;