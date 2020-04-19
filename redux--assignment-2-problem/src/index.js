import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import personsReducer from './store/reducers/persons'


const rootReducer = combineReducers({
    persons: personsReducer
})

const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
