"use strict";

import React, { Component, PropTypes } from "react";

import Arrows from "./arrows";
import Cbs from "./step-cbs";
import PromiseId from "./promise-id";

// then, catch
class Method extends Component {
	static propTypes = {
		index: PropTypes.number.isRequired,
		intermediatePromises: PropTypes.bool.isRequired,
		method: PropTypes.string.isRequired,
		parentStepPromiseState: PropTypes.string.isRequired,
		promise: PropTypes.object.isRequired
	}

	render () {
		const { index, intermediatePromises, method, parentStepPromiseState, promise } = this.props;
		const parentStepIndex = index === 1 ? "Source" : index - 1;

		var assign;
		if (intermediatePromises) {
			assign = [
				<span>var </span>,
				<PromiseId id={index} promiseState={promise.state} />,
				<span> = </span>,
				<PromiseId id={parentStepIndex} promiseState={parentStepPromiseState} />
			];
		}

		return (
			<div className="step-method">{assign}<strong>.{method}(</strong></div>
		);
	}
}

export default class Step extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		index: PropTypes.number.isRequired,
		parentStep: PropTypes.object.isRequired,
		step: PropTypes.object.isRequired,
		ui: PropTypes.object.isRequired
	}

	// click on the top right cross
	handleRemove () {
		this.props.actions.removeStep(this.props.index);
	}

	render () {
		const { actions, index, parentStep, step: { method, cbs, promise }, ui } = this.props;

		return (
				<li className={"step step-" + method}>
					<button className="step-remove" disable={ui.settled} onClick={::this.handleRemove} title="Remove this step">×</button>
					<div className="step-title">Step {index}</div>
					<Arrows parentStep={parentStep} />
					<Method
						index={index}
						intermediatePromises={ui.intermediatePromises}
						method={method}
						parentStepPromiseState={parentStep.promise.state}
						promise={promise}
					/>
					<Cbs actions={actions} cbs={cbs} index={index} parentStepPromiseState={parentStep.promise.state} ui={ui} />
					<div className="step-method-end"><strong>){ui.intermediatePromises ? ";" : ""}</strong></div>
				</li>
		);
	}
}

