import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
    console.log('Inside Course component');
    const courseName = course.name
    console.log('Course name is ', courseName);
    const parts = course.parts //this variable parts is an array
    console.log('parts is ', parts);
    return (
        <div>
            <Header name={courseName} />
            <Content parts={parts} />
        </div>
    )
}

export default Course