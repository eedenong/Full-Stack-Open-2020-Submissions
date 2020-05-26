import React from 'react'
//Header handles rendering of course name
const Header = ({ name }) => {
    console.log('Inside Header component');
    return (
        <h1>{name}</h1>
    )
}

export default Header