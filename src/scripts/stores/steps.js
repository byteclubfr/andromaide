import { ADD_THEN1, ADD_THEN2, ADD_CATCH, REMOVE_STEP } from "../constants/action-types";

const initialState = [
	{
		method: "then",
		cbs: [
			"success"
		]
	}
];

export default function steps (state = initialState, action) {
	switch (action.type) {
	case ADD_THEN1:
	case ADD_THEN2:
	case ADD_CATCH:
		return [
			...state,
			{
				method: action.method,
				cbs: action.cbs
			}
		];

	case REMOVE_STEP:
		return state.filter((step, index) => index !== action.index);

	default:
		return state;
	}
}
