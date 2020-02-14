import React from 'react'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import Person from './Person/Person'

const persons = (props) => props.persons.map( (person, index) => {
        // When working with displaying lists of elements
        // it is more efficient to set a unique key to each
        // element
        return (
            <ErrorBoundary key={ person.id }>
                <Person
                    click={ () => props.clicked(index) }
                    change={ (event) => props.changed(event, person.id) }
                    name={ person.name }
                    age={ person.age }
                    isAuth={props.isAuthenticated}
                    />
            </ErrorBoundary>
        )
})

export default persons;
