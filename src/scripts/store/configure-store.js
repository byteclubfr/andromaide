"use strict";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import persistState from "redux-localstorage";

import logger from "../middlewares/logger";
import settledPromise from "../middlewares/settled-promise";

import * as reducers from "../reducers";

// persistence
const createPersistentStore = compose(
	persistState("ui"),
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
