import {
	TOGGLE_OPTIONS, TOGGLE_EXECUTOR, TOGGLE_INTERMEDIATE_PROMISES, TOGGLE_CBS_NAME,
	CHANGE_FAKE_DELAY,
	FULFILL, REJECT
} from "../constants/action-types";

const initialState = {
	// toggles, show or hide
	options: false,
	executor: false,
	intermediatePromises: true,
	cbsName: false,
	// block certain part of the UI (buttons, textareas...)
	settled: false,
	fakeDelay: 0
};

export default function Ui (state = initialState, action) {
	switch (action.type) {
	case TOGGLE_OPTIONS:
		return { ...state, options: !state.options };

	case TOGGLE_EXECUTOR:
		return { ...state, executor: !state.executor };

	case TOGGLE_INTERMEDIATE_PROMISES:
		return { ...state, intermediatePromises: !state.intermediatePromises };

	case TOGGLE_CBS_NAME:
		return { ...state, cbsName: !state.cbsName };

	case CHANGE_FAKE_DELAY:
		return { ...state, fakeDelay: action.fakeDelay };

	case FULFILL:
	case REJECT:
		return { ...state, settled: true };

	default:
		return state;
	}
}
