import * as types from "../constants/action-types";

// ui options

export function toggleOptions () {
	return {
		type: types.TOGGLE_OPTIONS
	}
}

export function toggleExecutor () {
	return {
		type: types.TOGGLE_EXECUTOR
	}
}

export function toggleIntermediatePromises () {
	return {
		type: types.TOGGLE_INTERMEDIATE_PROMISES
	}
}

// source

export function changeInitValue (value) {
	return {
		type: types.CHANGE_INIT_VALUE,
		value
	}
}

export function fulfill (value, stepIndex, promise) {
	promise = promise || Promise.resolve(value);

	return {
		type: types.FULFILL,
		promise,
		stepIndex
	}
}

export function reject (value, stepIndex, promise) {
	promise = promise || Promise.reject(value);

	return {
		type: types.REJECT,
		promise,
		stepIndex
	}
}

// steps

export function addThen1 () {
	return {
		type: types.ADD_THEN1,
		method: "then",
		cbs: [
			{ type: "fulfilled", body: "return data;" }
		]
	}
}

export function addThen2 () {
	return {
		type: types.ADD_THEN2,
		method: "then",
		cbs: [
			{ type: "fulfilled", body: "return data;" },
			{ type: "rejected", body: "throw err;" }
		]
	}
}

export function addCatch () {
	return {
		type: types.ADD_CATCH,
		method: "catch",
		cbs: [
			{ type: "rejected", body: "throw err;" }
		]
	}
}

export function removeStep (index) {
	return {
		type: types.REMOVE_STEP,
		index: index
	};
}

// steps cbs

export function changeOnFulfilledBody (index, body) {
	return {
		type: types.CHANGE_ON_FULFILLED_BODY,
		index,
		body
	}
}

export function changeOnRejectedBody (index, body) {
	return {
		type: types.CHANGE_ON_REJECTED_BODY,
		index,
		body
	}
}
