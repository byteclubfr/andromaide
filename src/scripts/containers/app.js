"use strict";

// React needs to be included for JSX desuggaring
import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import persistState from "redux-localstorage";

import StepsApp from "./steps-app";
import * as reducers from "../reducers";

import logger from "../middlewares/logger";
import settledPromise from "../middlewares/settled-promise";

// persistence
// TODO split reducers
function persistentSlicer () {
	return (state) => {
		var subset =  {
			ui: {
				...state.ui
			}
		};
		delete subset.ui.settled;
		return subset;
	}
}

const createPersistentStore = compose(
	persistState("ui", { slicer: persistentSlicer }),
	createStore
);

const createStoreWithMiddleware = applyMiddleware(
	settledPromise,
	logger
)(createPersistentStore);

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

