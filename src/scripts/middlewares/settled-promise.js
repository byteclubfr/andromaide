import { fulfill, reject } from "../actions/actions";

export default store => next => action => {
	if (!action.promise) {
		return next(action)
	}

	function createNextPromise (data) {
		var nextStep = store.getState().steps[action.stepIndex + 1];
		var fns = getCbsFns(buildCbsFns(nextStep.cbs));

		var p = data.result
			? Promise.resolve(data.result)
			: Promise.reject(data.error)
		return p.then(fns.onFulfilled, fns.onRejected);
	}

	function makeAction (settled, data) {
		let newAction = {
			...action,
			settled,
			data
		};
		delete newAction.promise;
		return newAction;
	}

	function makeNextAction (data) {
		var nextP = createNextPromise(data);
		nextP.then(
			result => store.dispatch(fulfill(result, action.stepIndex + 1, nextP)),
			error => store.dispatch(reject(error, action.stepIndex + 1, nextP))
		);
		if (data.result) {
			return fulfill(data.result, action.stepIndex + 1, createNextPromise(data));
		}
		return reject(data.error, action.stepIndex + 1, createNextPromise(data));
	}

	function isLastStep () {
		return action.stepIndex === store.getState().steps.length - 1;
	}

	next(makeAction(false));

	return action.promise.then(
		result => {
			next(makeAction(true, { result }));
			if (!isLastStep()) makeNextAction({ result });
		},
		error => {
			next(makeAction(true, { error }));
			if (!isLastStep()) makeNextAction({ error });
		}
	);
};

function buildCbsFns (cbs) {
	return cbs.map(function (cb) {
		var arg = cb.type === "fulfilled" ? "data" : "err";
		return {
			...cb,
			fn: new Function(arg, cb.body)
		};
	});
}

function getCbsFns (cbs) {
	let onFulfilled = cbs.filter(cb => cb.type === "fulfilled")[0];
	let onRejected = cbs.filter(cb => cb.type === "rejected")[0];
	return {
		onFulfilled: onFulfilled ? onFulfilled.fn : null,
		onRejected: onRejected ? onRejected.fn : null
	};
}
