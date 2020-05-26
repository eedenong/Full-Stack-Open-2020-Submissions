import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
    const courseName = course.name
    const parts = course.parts //this variable parts is an array

    //sumObj is an object where the sum attribute contains the sum of exercises
    const sumObj = parts.reduce((res, part) => {
        return {exercises: res.exercises + part.exercises}
    })
    return (
        <div>
            <Header name={courseName} />
            <Content parts={parts} />
            <p><b>total of {sumObj.exercises} exercises</b></p>
        </div>
    )
}

export default Course