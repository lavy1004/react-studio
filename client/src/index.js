import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'react-app-polyfill/ie11'
import { Provider } from 'mobx-react'
import CounterStore from './Store/counter'

const counter = new CounterStore();


ReactDOM.render(
    <BrowserRouter>
        <Provider counter={counter}>
            <Home />
        </Provider>
    </BrowserRouter>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
