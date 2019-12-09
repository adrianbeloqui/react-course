import React, { Component } from 'react';
import './App.css';
import UserInput from './Components/UserInput/UserInput';
import UserOutput from './Components/UserOutput/UserOutput';

class App extends Component {
  state = {
    username: "Darthvader"
  }

  usernameInputHandler = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  render () {
    const style = {
        fontWeight: "bold",
        fontSize: "1.2em"
    }
    return (
      <div className="App">
        <h1>Welcome!</h1>
        <div style={style}>
          <label>Input username: </label>
          <UserInput
            username={ this.state.username }
            change={ this.usernameInputHandler } />
        </div>
        <UserOutput
          p1="Welcome" 
          username={ this.state.username } />
        <UserOutput
          p1="Second user"
          username="codeJunky" />
        <UserOutput
          p1="I promise this is the last one"
          username="skywalker" />
      </div>
    )
  }
}

export default App;
