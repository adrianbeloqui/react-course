import React from 'react'
import classes from './Person.module.css'
import Aux from '../../Hoc/Aux'
import withClass from '../../Hoc/withClass'

const person = (props) => {
    return (
        <Aux>
            <p onClick={ props.click }>I'm a { props.name } and I am { props.age } years old</p>
            <p>{ props.children }</p>
            <input type="text" onChange={ props.change } value={ props.name }/>
        </Aux>
    )
}

export default withClass(person, classes.Person);
