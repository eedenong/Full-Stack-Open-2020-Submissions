import React from 'react'

//Part renders name and number of exercises for particular part
const Part = ({ part }) => {
    console.log('Inside Part');
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

export default Part