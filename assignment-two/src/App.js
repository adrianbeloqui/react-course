import React, { Component } from 'react';
import Validation from './Components/Validation/Validation';
import Char from './Components/Char/Char';
import './App.css';

class App extends Component {
  state = {
    text: ''
  }

  changeInputHandler = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  clickCharHandler = (index) => {
    let textList = this.state.text.split('');
    textList.splice(index, 1);
    this.setState({
      text: textList.join('')
    });
  }

  render () {
    let chars = this.state.text.split('').map((char, index) => {
      return (
        <Char 
          letter={ char } 
          click={ this.clickCharHandler.bind(this, index) }
          key={ index } />
      )
    });

    return (
      <div className="App">
        <input
          type="text"
          onChange={ this.changeInputHandler }
          value={ this.state.text } />
        <p>
          The input has a length of { this.state.text.length }
        </p>
        <Validation textLength={ this.state.inputLength }/>
        { chars }
      </div>
    );
  }
}

export default App;
