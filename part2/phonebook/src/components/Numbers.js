import React from 'react'
import Person from './Person'
import numberService from '../services/numbers'

const Numbers = ({persons, setPersons, showAll, newFilter, setError, setNotification}) => {
    const personsToShow = showAll ? persons : persons.filter(person => {
        const nameLowerCased = person.name.toLowerCase()
        const filterLowerCased = newFilter.toLowerCase()
        return nameLowerCased.includes(filterLowerCased)
    })

    const handleDelete = (person) => {
        return () => {
            console.log('person to be deleted: ', person.name);
            if (window.confirm(`Delete ${person.name} ?`)) {
                const deleteId = person.id
                numberService
                    .remove(deleteId)
                    .then(ret => {
                        setPersons(persons.filter(p => p.id !== deleteId))
                        setNotification(`${person.name} deleted`)
                    })
                    .catch(error => {
                        setPersons(persons.filter(p => p.id !== deleteId))
                        setError(true)
                        setNotification(`${person.name} has already been removed from the server`)

                        setTimeout(() => {
                            setNotification(null)
                            setError(false)
                        }, 3000)
                    })
            }
        }
    }
    return (
        <div>
            {personsToShow.length === 0 
                ? 'Cannot find any numbers with the current filter!' 
                :personsToShow.map(person => {
                    return (
                    <div key={person.id}>
                        <Person name={person.name} number={person.number} id={person.id} handleDelete={handleDelete(person)} />
                    </div>
                )
                
            })}
        </div>
    )
}

export default Numbers