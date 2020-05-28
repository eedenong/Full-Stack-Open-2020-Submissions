import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilterValue ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
<<<<<<< HEAD

  // event handler for add button
  const addPerson = (event) => {
    event.preventDefault()
    // check if the name already exists in the persons array
    let dupeExists = false
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        dupeExists = true
      }
    }

    if (dupeExists) {
      alert(`${newName} is already added to phonebook`)
    }

    const validEntry = !dupeExists

    if (validEntry) {
      console.log('entry is valid, creating person');
      // create a person and add it
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      console.log('entry is invalid');
    }
      
    
  }

  // event handler for filter button
  const showFiltered = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
  }
  // event handler for name input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // event handler for number input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // event handler for filter input
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const personsToShow = showAll ? persons : persons.filter(person => {
    const nameLowerCased = person.name.toLowerCase()
    const filterLowerCased = newFilter.toLowerCase()
    console.log('name lower cased is', nameLowerCased);
    console.log('filter name lower cased is', filterLowerCased);
    return nameLowerCased.includes(filterLowerCased)
  })

=======
  
>>>>>>> 7e41e20... Ex 2.10
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setFilterValue={setFilterValue} showAll={showAll} setShowAll={setShowAll}/>
      <h2>Add new Number</h2>
      <PersonForm persons={persons} setPersons={setPersons}
        newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} showAll={showAll} newFilter={newFilter}/>
    </div>
  )
}

export default App
