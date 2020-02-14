import React from 'react'
import styled from 'styled-components'
import classes from './Cockpit.module.css'
import AuthContext from '../../Context/auth-context'


const StyledButton = styled.button`
    background-color: ${props => props.alternate ? 'red' : 'green'};
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: ${props => props.alternate ? 'salmon' : 'lightgreen'};
      color: black
    }
`

const cockpit = ( props ) => {
    let cssClasses = [];
    if (props.persons.length < 3) {
        cssClasses.push(classes.red);
    }

    if (props.persons.length < 2) {
        cssClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{ props.title }</h1>
            <p className={ cssClasses.join(' ') }>
                This is really working!
            </p>
            <StyledButton
                alternate={ props.showPersons }
                onClick={ props.clicked }>
                    Toggle Persons
            </StyledButton>
            <AuthContext.Consumer>
                {(context) => (
                    <StyledButton onClick={context.login}>
                        Log in
                    </StyledButton>
                )}
            </AuthContext.Consumer>
        </div>
    )
}

export default cockpit
