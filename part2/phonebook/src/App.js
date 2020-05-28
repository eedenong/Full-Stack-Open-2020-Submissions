import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilterValue ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const baseUrl = 'http://localhost:3001/persons'
  //get from database
  useEffect(() => {
    console.log('effect');
    axios
      .get(baseUrl)
      .then(response => {
        console.log('promise fulfilled');
        console.log('setting persons');
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setFilterValue={setFilterValue} showAll={showAll} setShowAll={setShowAll}/>
      <h2>Add new Number</h2>
      <PersonForm persons={persons} setPersons={setPersons}
        newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} baseUrl={baseUrl} />
      <h2>Numbers</h2>
      <Persons persons={persons} showAll={showAll} newFilter={newFilter}/>
    </div>
  )
}

export default App
