import React from 'react'
import Country from './Country'

const Countries = ({countries, newSearch}) => {

    //first we filter the data
    const countriesFiltered = countries.filter(
        country => {
            //lowercase the country name
            const lowerCasedSearch = newSearch.toLowerCase()
            const c = country.name.toLowerCase()
            return c.includes(lowerCasedSearch)
        }
    )


    const size = countriesFiltered.length

    // calls a function that returns the elements to be rendered, 
    // depending on the number of countries that are found
    return getDisplayElement(size, countriesFiltered)
}

function getDisplayElement(size, countriesFiltered) {
    if (size > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (size === 1) {
        // return country
        return (
            <div>
                <Country country={countriesFiltered[0]} />
            </div>
        )
    } else {
        return (
            <div>
                {countriesFiltered.map(country => 
                    <div key={country.name}>{country.name}</div>
                )}
            </div>
        )
    }
}

export default Countries