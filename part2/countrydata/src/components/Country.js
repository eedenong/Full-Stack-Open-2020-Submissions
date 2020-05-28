import React , { useState } from 'react'
import Weather from './Weather'

// component that renders a single country with all it's details
const Country = ({country, isShowing}) => {
    const [ show, setShow ] = useState(isShowing)
    //event handler
    const handleClick = () => {
        setShow(!show)
    }

    if (show) {
        console.log('in show conditional for return statement');
        return (
            <div>
                <h2>{country.name} <button onClick={handleClick}>hide</button></h2>
                <div>Capital: {country.capital}</div>
                <div>Population: {country.population}</div>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map(lang =>
                        <li key={lang.name}>{lang.name}</li>
                    )}
                </ul>
                <img src={country.flag} alt="country flag" width="128" height="128"/>
                <Weather country={country} />
            </div>
        )
    } else {
        return (
            <div>
                {country.name} <button onClick={handleClick}>show</button>
            </div>
        )
    }
}

export default Country