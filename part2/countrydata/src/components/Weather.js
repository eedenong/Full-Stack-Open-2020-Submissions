import React, { useEffect, useState }from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const [currWeather, setWeather] = useState({})

    useEffect(() => {
        console.log('in weather data effect hook');
        //view for a single country has to contain the country data
        //and data fetched from api. only run effect hook if weather data needs to be fetched
        const api_key = process.env.REACT_APP_API_KEY
        const params = {
            access_key: api_key,
            query: country.name
        }
        console.log('getting weather data');
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                const apiResponse = response.data
                console.log('api response data is ', apiResponse);
                console.log('setting weather to api response');
                setWeather(apiResponse)
            }).catch(error => {
                console.log(error);
            })
    
    }
    ,[country.name])

    console.log('current weather data is ', currWeather);
    return (
        <div>
            {Object.entries(currWeather).length === 0 
            ? 'loading weather data...'
            :   <div>
                    <h3>Weather in {country.capital}</h3>
                    <p><b>Temperature: </b>{currWeather.current.temperature} Celcius</p>
                    <img src={currWeather.current.weather_icons[0]} alt="weather icon" width="50" height="50" />
                    <p><b>Wind: </b>{currWeather.current.wind_speed} mph, direction {currWeather.current.wind_dir} </p>
                </div>
            }
        </div>
        
        
    )
}

export default Weather