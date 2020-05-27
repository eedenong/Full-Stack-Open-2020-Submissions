import React from 'react'

// component that renders a single country with all it's details
const Country = ({country}) => {
    // data to get are name, capital, population, languages (as ul)
    return (
        <div>
            <h2>{country.name}</h2>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(lang =>
                    <li key={lang.name}>{lang.name}</li>
                )}
            </ul>
            <img src={country.flag} width="128" height="128"/>
        </div>
    )
}

export default Country