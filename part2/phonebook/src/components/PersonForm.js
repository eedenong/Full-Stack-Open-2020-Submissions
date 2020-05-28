import React, { useState } from 'react'

const PersonForm = ({persons, setPersons, newName, newNumber, setNewName, setNewNumber}) => {
    
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

        // check if the number entered is valid
        const invalidNumber = isNaN(newNumber)

        if (invalidNumber) {
            alert(`${newNumber} is not a valid number!`)
        }

        const validEntry = !dupeExists && !invalidNumber

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
      </div>
  )
}

export default PersonForm