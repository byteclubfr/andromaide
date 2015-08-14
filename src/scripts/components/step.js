"use strict";

import React, { Component } from "react";
import classNames from "classnames";

import Arrows from "./arrows";
import Cbs from "./step-cbs";
import PromiseId from "./promise-id";

// then, catch
class Method extends Component {
	render () {
		const { method, index, promise, parentStepPromiseState, intermediatePromises } = this.props;
		const parentStepIndex = index === 1 ? "Source" : index - 1;

		var assign = "";
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
	// click on the top right cross
	handleRemove () {
		this.props.actions.removeStep(this.props.index);
	}

	render() {
		const { step: { method, cbs, promise }, parentStep, ui, index, actions } = this.props;

		return (
				<li className={"step step-" + method}>
					<button className="step-remove" onClick={::this.handleRemove} title="Remove this step" disabled={ui.settled}>×</button>
					<div className="step-title">Step {index}</div>
					<Arrows parentStep={parentStep} />
					<Method method={method} index={index} promise={promise} parentStepPromiseState={parentStep.promise.state} intermediatePromises={ui.intermediatePromises} />
					<Cbs index={index} cbs={cbs} actions={actions} ui={ui} parentStepPromiseState={parentStep.promise.state} />
					<div className="step-method-end"><strong>){ui.intermediatePromises ? ";" : ""}</strong></div>
				</li>
		);
	}
}
