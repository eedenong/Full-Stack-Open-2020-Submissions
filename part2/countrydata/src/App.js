import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Find from './components/Find'
import Countries from './components/Countries'

const App = () => {
  //define states
  const [ countries, setCountries ] = useState([])
  const [ newSearch, setSearch ] = useState('')

  // effect hook for fetching country data
  useEffect(() => {
    console.log('effect hook for country data')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled');
        console.log('response is ', response)
        setCountries(response.data)
      })
  }, [])

  //event handler for form
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <Find newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <Countries countries={countries} newSearch={newSearch} />
    </div>
  )
}

export default App;
