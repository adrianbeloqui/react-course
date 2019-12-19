import React, {Component} from 'react';
import './App.css';
import Person from './Components/Person/Person';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: ${props => props.alt ? 'red' : 'green'};
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
      color: black
    }
`;

class App extends Component {
  state = {
      persons: [
        { id: '1', name: "Max", age: 28},
        { id: '2', name: "Manu", age: 26},
        { id: '3', name: "Sophia", age: 22}
      ],
      showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
        persons: persons
    });
  }

  deletePersonHandler = (personIndex) => {
    // Shallow copy of persons to avoid editing the
    // array managed by React.
    // Also could do:
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons});
  }

  togglePersonshandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  // onClick={ () => this.switchNameHandler('Maximilian') } syntax can
  // be very inefficient, it is preferred to use the bind mechanism.

  render() {
    /*const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }*/

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          { this.state.persons.map((person, index) => {
              // When working with displaying lists of elements
              // it is more efficient to set a unique key to each
              // element
              return (
                <Person
                  click={ this.deletePersonHandler.bind(this, index) }
                  change={ (event) => this.nameChangedHandler(event, person.id) }
                  name={ person.name }
                  age={ person.age }
                  key={ person.id }/>
              )
          }) }
        </div>
      );

      /*style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };*/
    }

    let classes = [];
    if (this.state.persons.length < 3) {
      classes.push('red');
    }

    if (this.state.persons.length < 2) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={ classes.join(' ') }>
          This is really working!</p>
        <StyledButton
          alt={ this.state.showPersons }
          onClick={ this.togglePersonshandler }>
            Toggle Persons</StyledButton>
        { persons }
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('p', null, null));
  }
}

export default App;
