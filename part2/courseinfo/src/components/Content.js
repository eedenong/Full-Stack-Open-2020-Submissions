import React from 'react'
import Part from './Part'

//Content renders parts and exercises
const Content = ({ parts }) => {
    // parts is an array
    // map over the array to return the array of elements to be rendered
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

export default Content