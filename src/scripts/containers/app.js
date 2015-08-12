"use strict";

// React needs to be included for JSX desuggaring
import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import StepsApp from "./steps-app";
import * as reducers from "../reducers";

import logger from "../middlewares/logger";
import settledPromise from "../middlewares/settled-promise";

const createStoreWithMiddleware = applyMiddleware(
	settledPromise,
	logger
)(createStore);

const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
	render () {
		// anonymous fn because of how context works in react 0.13
		// <Provider> makes the store available to the connect() calls in the comp hierarchy below
		return (
			<Provider store={store}>
				{() => <StepsApp />}
			</Provider>
		);
	}
}

