"use strict";

import React, { Component } from "react";
import PromiseId from "./promise-id";

class Arrows extends Component {
	render () {
		const { upStepPromiseState } = this.props;

		return (
			<div className="step-arrows">
				<div className="step-arrow fulfilled">{ upStepPromiseState === "fulfilled" ? "⬇" : ""}</div>
				<div className="step-arrow rejected">{ upStepPromiseState === "rejected" ? "⬇" : ""}</div>
			</div>
	);
	}
}

// then, catch
class Method extends Component {
	render () {
		const { method, index, promise, upStepPromiseState, intermediatePromises } = this.props;
		const upStateIndex = index === 1 ? "Source" : index - 1;

		var assign = "";
		if (intermediatePromises) {
			assign = [
				<span>var </span>,
				<PromiseId id={index} promiseState={promise.state} />,
				<span> = </span>,
				<PromiseId id={upStateIndex} promiseState={upStepPromiseState} />
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
		const { step: { method, cbs, promise }, upStep, ui, index, actions } = this.props;

		return (
				<li className={"step step-" + method}>
					<button className="step-remove" onClick={::this.handleRemove} title="Remove this step">×</button>
					<div className="step-title">Step {index}</div>
					<Arrows upStepPromiseState={upStep.promise.state} />
					<Method method={method} index={index} promise={promise} upStepPromiseState={upStep.promise.state} intermediatePromises={ui.intermediatePromises} />
					<Cbs index={index} cbs={cbs} actions={actions} />
					<div className="step-method-end"><strong>){ui.intermediatePromises ? ";" : ""}</strong></div>
				</li>
		);
	}
}
