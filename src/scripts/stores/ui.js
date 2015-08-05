import { TOGGLE_INTERMEDIATE_PROMISES } from "../constants/action-types";

const initialState = {
	intermediatePromises: true
};

export default function source (state = initialState, action) {
	switch (action.type) {
	case TOGGLE_INTERMEDIATE_PROMISES:
		return { ...state, intermediatePromises: !state.intermediatePromises };

	default:
		return state;
	}
}
