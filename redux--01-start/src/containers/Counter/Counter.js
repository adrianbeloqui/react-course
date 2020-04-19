import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actionTypes from '../../store/actions'
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
                break
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubstractCounter(5)}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map( res => {
                        return (
                            <li key={res.id} onClick={() => this.props.onDeleteResult(res.id)}>{res.value}</li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT}),
        onAddCounter: (value) => dispatch({ type: actionTypes.ADD, 'value': value}),
        onSubstractCounter: (value) => dispatch({ type: actionTypes.SUBSTRACT, 'value': value}),
        onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, 'result': result}),
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, 'id': id}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);