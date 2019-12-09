import React, {Component} from 'react';
import './App.css';
import Person from './Components/Person/Person';

class App extends Component {
  state = {
      persons: [
        { name: "Max", age: 28},
        { name: "Manu", age: 26},
        { name: "Sophia", age: 22}
      ]
  }

  switchNameHandler = (newName) => {
    // console.log("Was Clicked");
    // DON'T DO THIS: this.state.persons[0].name = "Maximilian";
    this.setState({
        persons: [
          { name: newName, age: 30},
          { name: "Manu", age: 26},
          { name: "Sophia", age: 22}
        ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
        persons: [
          { name: 'Max', age: 28},
          { name: event.target.value, age: 26},
          { name: "Sophia", age: 22}
        ]
    })
  }

  // onClick={ () => this.switchNameHandler('Maximilian') } syntax can
  // be very inefficient, it is preferred to use the bind mechanism.

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button 
          style={ style }
          onClick={ () => this.switchNameHandler('Maximilian') }>Switch Name</button>
        <Person
          name={ this.state.persons[0].name }
          age={ this.state.persons[0].age } />
        <Person
          name={ this.state.persons[1].name }
          age={ this.state.persons[1].age } 
          click={ this.switchNameHandler.bind(this, "Max!") } 
          change={ this.nameChangedHandler } >My Hobbies: Racing</Person>
        <Person
          name={ this.state.persons[2].name }
          age={ this.state.persons[2].age } />
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('p', null, null));
  }
}

export default App;
