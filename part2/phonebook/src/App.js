import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import numberService from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilterValue ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ notification, setNotification ] = useState(null)
  const [ isError, setError ] = useState(false)
  
  //get persons from database
  useEffect(() => {
    console.log('Getting list of persons from database');
    numberService
      .getAll()
      .then(returnedPersons => {
        console.log('returnedPersons is', returnedPersons);
        setPersons(returnedPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError} />
      <Filter newFilter={newFilter} setFilterValue={setFilterValue} showAll={showAll} setShowAll={setShowAll}/>
      <h2>Add new number</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} newNumber={newNumber}
       setNewName={setNewName} setNewNumber={setNewNumber}
      setNotification={setNotification} setError={setError} />
      <h2>Numbers</h2>
      <Numbers persons={persons} setPersons={setPersons} showAll={showAll} newFilter={newFilter} setError={setError} setNotification={setNotification}/>
    </div>
  )
}

export default App
