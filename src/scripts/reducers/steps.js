import {
	ADD_THEN1, ADD_THEN2, ADD_CATCH, REMOVE_STEP,
	CHANGE_INIT_VALUE, FULFILL, REJECT,
	CHANGE_ON_FULFILLED_BODY, CHANGE_ON_REJECTED_BODY
} from "../constants/action-types";

const initialState = [
	// 0 = source
	{
		initValue: "'toto'",
		promise: {
			state: "pending"
		}
	},
	{
		promise: {
			state: "pending"
		},
		method: "then",
		cbs: [
			{ type: "fulfilled", body: "return data.toUpperCase();" }
		]
	},
	{
		promise: {
			state: "pending"
		},
		method: "catch",
		cbs: [
			{ type: "rejected", body: "throw err;" }
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
				promise: {
					state: "pending"
				},
				method: action.method,
				cbs: action.cbs
			}
		];

	case REMOVE_STEP:
		return state.filter((step, index) => index !== action.index);

	case CHANGE_INIT_VALUE:
		return state.map(function (step, index) {
			// source
			if (index === 0) {
				return {
					...step,
					initValue: action.value
				};
			}
			return step;
		});

	case FULFILL:
		if (!action.settled) return state;

		return state.map(function (step, index) {
			if (index === action.stepIndex) {
				return {
					...step,
					promise: {
						state: "fulfilled",
						value: action.data.result
					}
				};
			}
			// to ease diagonal arrows
			if (index === action.stepIndex + 1) {
				return {
					...step,
					parentStepPromiseState: "fulfilled"
				}
			}
			return step;
		});

	case REJECT:
		if (!action.settled) return state;

		return state.map(function (step, index) {
			if (index === action.stepIndex) {
				return {
					...step,
					promise: {
						state: "rejected",
						value: action.data.error
					}
				};
			}
			// to ease diagonal arrows
			if (index === action.stepIndex + 1) {
				return {
					...step,
					parentStepPromiseState: "rejected"
				}
			}
			return step;
		});

	case CHANGE_ON_FULFILLED_BODY:
		return state.map(function (step, index) {
			if (index === action.index) {
				return {
					...step,
					cbs: step.cbs.map(cb => {
							if (cb.type !== "fulfilled") return cb;
							return { type: "fulfilled", body: action.body };
					})
				};
			}
			return step;
		});

	case CHANGE_ON_REJECTED_BODY:
		return state.map(function (step, index) {
			if (index === action.index) {
				return {
					...step,
					cbs: step.cbs.map(cb => {
							if (cb.type !== "rejected") return cb;
							return { type: "rejected", body: action.body };
					})
				};
			}
			return step;
		});

	default:
		return state;
	}
}
