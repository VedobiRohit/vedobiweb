import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import {App} from "./components/app";
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import { store, persistor } from './store';


// const store = createStore(reducers, state, applyMiddleware(thunk));

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById( 'app' )
);