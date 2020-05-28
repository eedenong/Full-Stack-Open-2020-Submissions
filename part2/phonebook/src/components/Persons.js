import React from 'react'

const Persons = ({persons, showAll, newFilter}) => {
    const personsToShow = showAll ? persons : persons.filter(person => {
        const nameLowerCased = person.name.toLowerCase()
        const filterLowerCased = newFilter.toLowerCase()
        console.log('name lower cased is', nameLowerCased);
        console.log('filter name lower cased is', filterLowerCased);
        return nameLowerCased.includes(filterLowerCased)
    })

    return (
        <div>
            {personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>
    )
}

export default Persons