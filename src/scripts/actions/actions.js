import * as types from '../constants/action-types';

// options

export function toggleIntermediatePromises () {
	return {
		type: types.TOGGLE_INTERMEDIATE_PROMISES
	}
}

// source

export function resolve () {
	return {
		type: types.RESOLVE
	}
}

export function reject () {
	return {
		type: types.REJECT
	}
}

// steps

export function addThen1 () {
	return {
		type: types.ADD_THEN1,
		method: "then",
		cbs: [
			{ type: "success", body: "return data;" }
		]
	}
}

export function addThen2 () {
	return {
		type: types.ADD_THEN2,
		method: "then",
		cbs: [
			{ type: "success", body: "return data;" },
			{ type: "error", body: "throw err;" }
		]
	}
}

export function addCatch () {
	return {
		type: types.ADD_CATCH,
		method: "catch",
		cbs: [
			{ type: "error", body: "throw err;" }
		]
	}
}

export function removeStep (index) {
	return {
		type: types.REMOVE_STEP,
		index: index
	};
}

