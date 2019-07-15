import React, { useState } from 'react';
import './App.css';
import Person from './Components/Person/Person';

const App = props => {
  /*
  In function based components updating the state REPLACES completely the 
  old state data. In class based components the state is MERGED with the old
  state data.
  */

  const [personsState, setPersonsState] = useState({
    persons: [
      { name: "Max", age: 28},
      { name: "Manu", age: 26},
      { name: "Sophia", age: 22}
    ]
  })

  // useState can be called many time to manage/handle different state data

  // console.log(personsState);

  const switchNameHandler = () => {
    setPersonsState({
        persons: [
          { name: "Maximilian", age: 30},
          { name: "Manu", age: 26},
          { name: "Sophia", age: 22}
        ]
    })
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <button onClick={ switchNameHandler }>Switch Name</button>
      <Person name={ personsState.persons[0].name } age={ personsState.persons[0].age } />
      <Person name={ personsState.persons[1].name } age={ personsState.persons[1].age } >My Hobbies: Racing</Person>
      <Person name={ personsState.persons[2].name } age={ personsState.persons[2].age } />
    </div>
  );
}

export default App;
