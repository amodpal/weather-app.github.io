import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import rain_icon from '../assets/rain.png';
import rain2_icon from '../assets/rain2.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidty_icon from '../assets/humidty.png';

function Weather() {

    const inputRef = useRef()

    const [weatherDATA, setWeatherData] = useState(false);

    const allicon = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": rain2_icon,
        "04n": rain2_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city)=>{
        if(city == ""){
            alert("Enter City Name");
            return;
        }
        try{
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

const response = await fetch(url);
const data = await response.json();

if(!response.ok){
    alert(data.message);
    return;
}


console.log(data); 
const icon = allicon[data.weather[0].icon] || clear_icon;
setWeatherData({
    humidity: data.main.humidity,
    windSpeed:data.wind.speed,
    temperature: Math.floor(data.main.temp),
    location: data.name, 
    icon: icon
})

        }catch (error){
setWeatherData(false);
console.error("Error in fetching weather data");
        }
        
    }
    useEffect(()=>{
        search("London");
    },[])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Enter city name'/>
            <img src={search_icon} alt="" className='img' onClick={()=>search(inputRef.current.value)}/>
        </div>
{weatherDATA?<>
        <img src={weatherDATA.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherDATA.temperature}c</p>
        <p className='location'>{weatherDATA.location}</p>
        <div className="weather-data">
        <div className="col">
            <img src={humidty_icon} alt="" />
            <div>
                <p>{weatherDATA.humidity} %</p>
                <span>Humidty</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherDATA.windSpeed} km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
        </div>
        </>:<></>}
        </div>
  )
}

export default Weather