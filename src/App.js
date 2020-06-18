import React, { useState } from 'react'
import { fetchWeather } from './api/fetchWeather'
import './App.css'

const App = () => {

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    const search = async(e) => {
        if(e.key === 'Enter'){
            const data = await fetchWeather(query)

            setWeather(data)
            console.log(data)
            setQuery('')
        }
    }

    return( 
        <div className='main-container'>
            <input 
                type='text'
                className='search'
                placeholder='Search....'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
                autoFocus='autofocus'
            />
            {weather.main && (
                <div className='city'>
                    <h2 className='city-name'>
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <span><strong>Direction:</strong></span>
                        <span><strong>latitude:</strong> {weather.coord.lat} &nbsp; &nbsp; <strong>longitude:</strong> {weather.coord.lon}</span>
                    <div className='city-temp'>
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className='info'>
                        <img className='city-icon' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p><strong>{weather.weather[0].description}</strong></p>
                    
                        <span><strong>Max. Temperature:</strong> {weather.main.temp_max}</span>
                        <span><strong>Min. Temperature:</strong> {weather.main.temp_min}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App