import { ADD_THEN1, ADD_THEN2, ADD_CATCH, REMOVE_STEP, RESOLVE, REJECT } from "../constants/action-types";

const initialState = [
	// 0 = source
	{
		initValue: "toto",
		promise: {
			state: "pending",
			value: null,
			// real promise instance
			obj: null
		}
	},
	{
		promise: {
			state: "pending"
		},
		method: "then",
		cbs: [
			{ type: "success", body: "return data" }
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
				promise: {},
				method: action.method,
				cbs: action.cbs
			}
		];

	case REMOVE_STEP:
		return state.filter((step, index) => index !== action.index);

	case RESOLVE:
		return state.map(function (step, index) {
			// source
			if (index === action.stepIndex) {
				return {
					...step,
					promise: {
						state: "fulfilled",
						value: action.value
					}
				};
			}
			return step;
		});

	case REJECT:
		return state.map(function (step, index) {
			// source
			if (index === action.stepIndex) {
				return {
					...step,
					promise: {
						state: "rejected",
						value: action.value
					}
				};
			}
			return step;
		});

	default:
		return state;
	}
}

function buildCbsFns (cbs) {
	return cbs.reduce(function (cb) {
		var arg = cb.type === "success" ? "data" : "err";
		return {
			...cb,
			fn: new Function(arg, cb.body)
		};
	}, {});
}

function cbsToMap (cbs) {
	return {
		onSuccess: cbs.filter(cb => cb.type === "success")[0],
		onError: cbs.filter(cb => cb.type === "error")[0]
	};
}

function buildChains (state) {
	var promises = state.map(function (step, index) {
		var cbs = buildCbsFns(step.cbs);
		cbs = cbsToMap(cbs);
		step.promise = state[index - 1].promise.then(cbs.onSuccess, cbs.onError);
		return step.promise;
	});

	return promises;
}
