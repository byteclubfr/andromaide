"use strict";

import React, { Component } from "react";
import Arrows from "./arrows";
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

// Cbs = Callbacks
class Cbs extends Component {
	render () {
		const { cbs, actions, index } = this.props;

		return (
			<div className="step-cbs">
				{cbs.map(cb => cb.type === "fulfilled"
						? <OnFulfilled key="fulfilled" body={cb.body} onChange={actions.changeOnFulfilledBody.bind(null, index)} />
						: <OnRejected key="rejected" body={cb.body} onChange={actions.changeOnRejectedBody.bind(null, index)} />)}
			</div>
		);
	}
}

class OnFulfilled extends Component {
	handleChange(event) {
		this.props.onChange(event.target.value);
	}
	render () {
		const { body } = this.props;

		return (
			<div className="step-cb on-fulfilled">
				function onFulfilled (data) &#123;
					<textarea value={body} onChange={::this.handleChange}></textarea>
				&#125;
			</div>
		);
	}
}

class OnRejected extends Component {
	handleChange(event) {
		this.props.onChange(event.target.value);
	}
	render () {
		const { body } = this.props;

		return (
			<div className="step-cb on-rejected">
				function onRejected (err) &#123;
					<textarea value={body} onChange={::this.handleChange}></textarea>
				&#125;
			</div>
		);
	}
}

export default class Step extends Component {
	handleRemove () {
		this.props.actions.removeStep(this.props.index);
	}
	render() {
		const { step: { method, cbs, promise }, parentStep, ui, index, actions } = this.props;

		return (
				<li className={"step step-" + method}>
					<button className="step-remove" onClick={::this.handleRemove} title="Remove this step">×</button>
					<div className="step-title">Step {index}</div>
					<Arrows parentStep={parentStep} />
					<Method method={method} index={index} promise={promise} parentStepPromiseState={parentStep.promise.state} intermediatePromises={ui.intermediatePromises} />
					<Cbs index={index} cbs={cbs} actions={actions} />
					<div className="step-method-end"><strong>){ui.intermediatePromises ? ";" : ""}</strong></div>
				</li>
		);
	}
}
