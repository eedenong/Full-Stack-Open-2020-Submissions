import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import numberService from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  // we will use a counter to keep track of how many people we have added so far
  // to prevent adding of persons with duplicate ids
  const [ count, setCount ] = useState(0)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilterValue ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ notification, setNotification ] = useState(null)
  const [ isError, setError ] = useState(false)
  
  //get persons from database
  useEffect(() => {
    console.log('effect');
    numberService
      .getAll()
      .then(returnedPersons => {
        console.log('returnedPersons is', returnedPersons);
        setPersons(returnedPersons)
        const len = returnedPersons.length
        // the id of the last person keeps track of how many people we have added so far
        const totalCount = returnedPersons[len - 1].id
        setCount(totalCount)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError} />
      <Filter newFilter={newFilter} setFilterValue={setFilterValue} showAll={showAll} setShowAll={setShowAll}/>
      <h2>Add new number</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} newNumber={newNumber}
       setNewName={setNewName} setNewNumber={setNewNumber} count={count} setCount={setCount}
      setNotification={setNotification} setError={setError} />
      <h2>Numbers</h2>
      <Numbers persons={persons} setPersons={setPersons} showAll={showAll} newFilter={newFilter} setError={setError} setNotification={setNotification}/>
    </div>
  )
}

export default App
