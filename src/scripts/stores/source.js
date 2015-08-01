import { RESOLVE, REJECT } from "../constants/action-types";

const initialState = {
	promiseState: "pending",
	value: "foo"
};

export default function source (state = initialState, action) {
	switch (action.type) {
	case RESOLVE:
		return { ...state, promiseState: "fulfilled" };

	case REJECT:
		return { ...state, promiseState: "rejected" };

	default:
		return state;
	}
}

