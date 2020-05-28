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

    function getDisplayElement(size, countriesFiltered) {
        if (size > 10) {
            return (
                <div>Too many matches, specify another filter</div>
            )
        } else if (size === 1) {
            // return country
            return (
                <div>
                    <Country country={countriesFiltered[0]} isShowing={true}/>
                </div>
            )
        } else {
            return (
                <div>
                    {countriesFiltered.map(country => {
                        return (
                            <div key={country.name}>
                                <Country country={country} isShowing={false} />
                            </div>
                            )
                        }
                    )}
                </div>
            )
        }
    }

    return getDisplayElement(size, countriesFiltered)
}



export default Countries