import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

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
    } else {
      // create a person and add it
      const newPerson = {
        name: newName
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
    
  }

  // event handler for name input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
    </div>
  )
}

export default App
