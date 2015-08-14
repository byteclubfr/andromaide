"use strict";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import persistState from "redux-localstorage";

import logger from "../middlewares/logger";
import settledPromise from "../middlewares/settled-promise";

import * as reducers from "../reducers";

// persistence

// TODO split reducers
function persistentSlicer () {
	return (state) => {
		return {
			...state,
			steps: state.steps.map(step => {
				return {
					...step,
					promise: {
						state: "pending"
					}
				}
			})
		};
	}
}

const createPersistentStore = compose(
	persistState(["ui", "steps"], { slicer: persistentSlicer }),
	createStore
);

// middlewares

const createStoreWithMiddleware = applyMiddleware(
	settledPromise,
	logger
)(createPersistentStore);

const rootReducer = combineReducers(reducers);

export default function configureStore (initialState) {
	return createStoreWithMiddleware(rootReducer, initialState);
}
