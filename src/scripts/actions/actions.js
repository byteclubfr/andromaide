import * as types from '../constants/action-types';

export function addThen1 () {
	return {
		type: types.ADD_THEN1,
		method: "then",
		cbs: ["success"]
	}
}

export function addThen2 () {
	return {
		type: types.ADD_THEN2,
		method: "then",
		cbs: ["success", "error"]
	}
}

export function addCatch () {
	return {
		type: types.ADD_CATCH,
		method: "catch",
		cbs: ["error"]
	}
}

export function removeStep (index) {
	return {
		type: types.REMOVE_STEP,
		index: index
	};
}
