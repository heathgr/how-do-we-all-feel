import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

let store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
let { dispatch } = store;

function render() {
  ReactDOM.render(
    <App dispatch={dispatch} {...store.getState()}/>,
    document.getElementById('app')
  );
};

store.subscribe(render);
render();
