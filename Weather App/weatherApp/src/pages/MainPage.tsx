import Panel from '../components/Panel';
import { useEffect, useState } from 'react';
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

    //extracting the lat n long frm data 
    const lat= data?.latitude
    const long= data?.longitude

    useEffect(()=>{
        if(lat&&long){
            //call weather api using lat long from data
        }
        else{
          console.log("Coordinates have not been received properly")
        }
    },[lat,long])



  return (
    <div>
      <h1>Welcome to the Weather App</h1>
      <Panel onSearch={handleSearch}/>

       {data && <Display data={data}/>}
    </div>
  );
}
export default MainPage;