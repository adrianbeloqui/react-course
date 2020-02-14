import React, {Component} from 'react';
import './App.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit'
import withClass from '../Components/Hoc/withClass'
import Aux from '../Components/Hoc/Aux'
import AuthContext from '../Context/auth-context'

class App extends Component {
  state = {
      persons: [
        { id: '1', name: "Max", age: 28},
        { id: '2', name: "Manu", age: 26},
        { id: '3', name: "Sophia", age: 22}
      ],
      showPersons: false,
      changeCounter: 0,
      authenticated: false
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

  loginHandler = () => {
    this.setState({
      authenticated: true
    })
  }

  render() {
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          clicked={ this.deletePersonHandler }
          changed={ this.nameChangedHandler }
          persons={ this.state.persons }
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    return (
      <Aux>
        <AuthContext.Provider 
          value={{
            authenticated: this.state.authenticated, 
            login: this.loginHandler
          }} >
          <Cockpit
            title={ this.props.appTitle }
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
          />
          { persons }
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('p', null, null));
  }
}

export default withClass(App, 'App');
