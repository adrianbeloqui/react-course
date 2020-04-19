import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
    state = {
        name: '',
        age: ''
    }

    nameChangedHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    ageChangedHandler = (e) => {
        this.setState({
            age: e.target.value
        })
    }

    render() {
        return (
            <div className="AddPerson">
                <input value={this.state.name} onChange={this.nameChangedHandler} type="text" placeholder="Name" />
                <input value={this.state.age} onChange={this.ageChangedHandler} type="text" placeholder="Age" />
                <button onClick={() => this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
            </div>
        )
    }
}

export default AddPerson;