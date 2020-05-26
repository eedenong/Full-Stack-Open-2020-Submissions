import React from 'react'

//Part renders name and number of exercises for particular part
const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

export default Part