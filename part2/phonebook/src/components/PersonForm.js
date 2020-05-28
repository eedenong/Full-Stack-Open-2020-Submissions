import React from 'react'
import numberService from '../services/numbers'

const PersonForm = ({persons, setPersons, newName, newNumber, setNewName, setNewNumber, baseUrl}) => {
    
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
            //if its a valid entry, create and do a post request
            console.log('entry is valid, creating person');
            // create a person and add it
            const newPerson = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }
            console.log('new person created');
            console.log('making post request');
            //define the axios post request to put data into the db
            numberService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')  
                })
            console.log('person added to database');
            console.log('persons list in addPerson is ', persons)
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