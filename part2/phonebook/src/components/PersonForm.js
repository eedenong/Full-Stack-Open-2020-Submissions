import React from 'react'
import numberService from '../services/numbers'

const PersonForm = ({persons, setPersons, newName, newNumber, setNewName, setNewNumber, count, setCount}) => {
    
    function addEntry() {
        console.log('creating person object to be added');
        // create a person and add it
        const newPerson = {
            name: newName,
            number: newNumber,
            id: count + 1
        }
        console.log('new person created: ', newPerson);
        //define the axios post request to put data into the db
        numberService
            .create(newPerson)
            .then(returnedPerson => {
                console.log('post request response is ', returnedPerson);
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('') 
                setCount(count + 1)
            })
            .catch(error => {
                console.log(error.message);
            })
        console.log('person added to database');
        console.log('persons list in addPerson is ', persons)
    }

    function editEntry(personToEdit) {
        const newPerson = {...personToEdit, number:newNumber}
        console.log('newPerson created is ', newPerson);
        numberService
            .edit(newPerson)
            .then(returnedPerson => {
                console.log('put request response is ', returnedPerson);
                setNewName('')
                setNewNumber('')
                setPersons(persons.map(person => {
                    const name = person.name
                    if (name === newName) {
                        return returnedPerson
                    } else {
                        return person
                    }
                }))
            })
    }
    // function to check phonebook if there is a person with an already existing name 
    function checkDuplicateName() {
        // check if the name already exists in the persons array
        let nameExists = false
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === newName) {
                nameExists = true
            }
        }
        return nameExists
    }

    function checkDuplicateNumber() {
        let numberExists = false
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].number === newNumber) {
                numberExists = true
            }
        }
        return numberExists
    }

    // event handler for add button
    const addPerson = (event) => {
        event.preventDefault()
        
        // isDuplicate indicates whether a person of the same name exists in the phonebook
        const nameExists = checkDuplicateName()
        const numberExists = checkDuplicateNumber()

        console.log('name exists: ', nameExists);
        console.log('number exists: ', numberExists);
        // person is considered duplicate iff name and number both already exist
        const isDuplicate = nameExists && numberExists
        console.log('isDuplicate: ', isDuplicate);
        // guard clause for duplicate person addition
        if (isDuplicate) {
            alert(`${newName} is already added to phonebook`)
        }

        // if the person to be added is unique, just add it straightaway
        const isUnique = (!nameExists && !numberExists)
        console.log('isUnique: ', isUnique);
        if (isUnique) {
            addEntry()
        }
        
        // two persons cannot have the same number, alert the user in such a case
        const twoSameNumbers = !nameExists && numberExists
        if (twoSameNumbers) {
            window.alert('Two people cannot have the same number!')
        }

        // if name already exists but the number entered is different, ask user for confirmation
        // if the user wants to change the number
        const changeNumber = nameExists && !numberExists
        console.log('change number: ', changeNumber);
        if (changeNumber) {
            const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            // if the user confirms, then add the entry. otherwise, do nothing
            if (result) {
                const personToEdit = persons.find(person => person.name === newName)
                editEntry(personToEdit)
            }
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