import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: 92929999 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
      console.log('entry is valid, createing person');
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

  // event handler for name input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // event handler for number input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
      </div>
    </div>
  )
}

export default App
