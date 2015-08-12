import * as types from '../constants/action-types';

// options

export function toggleIntermediatePromises () {
	return {
		type: types.TOGGLE_INTERMEDIATE_PROMISES
	}
}

// source

export function fulfill (value, stepIndex) {
	return {
		type: types.FULFILL,
		value,
		stepIndex
	}
}

export function reject (value, stepIndex) {
	return {
		type: types.REJECT,
		value,
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

