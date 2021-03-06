import React from 'react'
import PropTypes from 'prop-types'
import { useEffect, useRef, useContext } from 'react'

import classes from './Person.module.css'
import Aux from '../../Hoc/Aux'
import withClass from '../../Hoc/withClass'
import AuthContext from '../../../Context/auth-context'

const Person = (props) => {
    const inputElementRef = useRef(null);
    const authContext = useContext(AuthContext)

    useEffect(() => {
        inputElementRef.current.focus()
        console.log(authContext.authenticated)
    }, [])

    return (
        <Aux>
            {authContext.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
            <p onClick={ props.click }>
                I'm a { props.name } and I am { props.age } years old
            </p>
            <p>{ props.children }</p>
            <input
                ref={ inputElementRef }
                type="text"
                onChange={ props.change }
                value={ props.name }
            />
        </Aux>
    )
}

Person.propTypes = {
    'click': PropTypes.func,
    'change': PropTypes.func,
    'name': PropTypes.string,
    'age': PropTypes.number
}

Person.defaultTypes = {
    'click': null,
    'change': null,
    'name': '',
    'age': 0
}

export default withClass(Person, classes.Person);
