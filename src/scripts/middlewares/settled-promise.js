import { fulfill, reject } from "../actions/actions";

export default store => next => action => {
	if (!action.promise) {
		return next(action)
	}

	function createAction (settled, data) {
		let newAction = {
			...action,
			settled,
			data
		};
		delete newAction.promise;
		return newAction;
	}

	function createNextPromise (data) {
		var nextStep = store.getState().steps[action.stepIndex + 1];
		var fns = getCbsFns(buildCbsFns(nextStep.cbs));

		function executor (resolve, reject) {
			setTimeout(function () {
				if (data.hasOwnProperty("result")) {
					resolve(data.result)
				} else {
					reject(data.error);
				}
			}, store.getState().ui.fakeDelay);
		}

		var p = new Promise(executor);
		return p.then(fns.onFulfilled, fns.onRejected);
	}

	function createNextAction (data) {
		var nextP = createNextPromise(data);
		nextP.then(
			result => store.dispatch(fulfill(result, action.stepIndex + 1, nextP)),
			error => store.dispatch(reject(error, action.stepIndex + 1, nextP))
		);
	}

	function isLastStep () {
		return action.stepIndex === store.getState().steps.length - 1;
	}

	next(createAction(false));

	return action.promise.then(
		result => {
			next(createAction(true, { result }));
			if (!isLastStep()) createNextAction({ result });
		},
		error => {
			next(createAction(true, { error }));
			if (!isLastStep()) createNextAction({ error });
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
