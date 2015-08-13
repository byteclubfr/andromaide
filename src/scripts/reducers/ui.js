import { TOGGLE_OPTIONS, TOGGLE_INTERMEDIATE_PROMISES } from "../constants/action-types";

// toggles, show or hide
const initialState = {
	options: false,
	intermediatePromises: true
};

export default function Ui (state = initialState, action) {
	switch (action.type) {
	case TOGGLE_OPTIONS:
		return { ...state, options: !state.options };

	case TOGGLE_INTERMEDIATE_PROMISES:
		return { ...state, intermediatePromises: !state.intermediatePromises };

	default:
		return state;
	}
}
