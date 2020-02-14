import React, {Component} from 'react';
import './App.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit'
import withClass from '../Components/Hoc/withClass'
import Aux from '../Components/Hoc/Aux'

class App extends Component {
  state = {
      persons: [
        { id: '1', name: "Max", age: 28},
        { id: '2', name: "Manu", age: 26},
        { id: '3', name: "Sophia", age: 22}
      ],
      showPersons: false,
      changeCounter: 0
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

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    })
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

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          clicked={ this.deletePersonHandler }
          changed={ this.nameChangedHandler }
          persons={ this.state.persons }
        />
      );
    }

    return (
      <Aux>
        <Cockpit
          title={ this.props.appTitle }
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
        />
        { persons }
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('p', null, null));
  }
}

export default withClass(App, 'App');
