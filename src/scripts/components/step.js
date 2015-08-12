"use strict";

import React, { Component } from "react";
import PromiseId from "./promise-id";

// then, catch
class Method extends Component {
	render () {
		const { method, index, upStepPromiseState, intermediatePromises } = this.props;
		const upStateIndex = index === 1 ? "Source" : index - 1;

		var assign = "";
		if (intermediatePromises) {
			assign = [
				<span>var </span>,
				<PromiseId id={index} promiseState="pending" />,
				<span> = </span>,
				<PromiseId id={upStateIndex} promiseState={upStepPromiseState} />
			];
		}

		return (
			<div className="step-method">{assign}.<strong>{method}</strong>(</div>
		);
	}
}

class StepsCbs extends Component {
	render () {
		const { cbs } = this.props;

		return (
			<div className="step-cbs">
				{cbs.map(cb => cb.type === "error"
						? <ErrorCb key="error" body={cb.body} />
						: <SuccessCb key="success" body={cb.body} />)}
			</div>
		);
	}
}

class SuccessCb extends Component {
	handleChange(event) {

	}
	render () {
		const { body } = this.props;

		return (
			<div className="step-cb on-success">
				function onSuccess (data) &#123;
					<textarea value={body} onChange={::this.handleChange}></textarea>
				&#125;
			</div>
		);
	}
}

class ErrorCb extends Component {
	handleChange(event) {

	}
	render () {
		const { body } = this.props;

		return (
			<div className="step-cb on-error">
				function onError (err) &#123;
					<textarea value={body} onChange={::this.handleChange}></textarea>
				&#125;
			</div>
		);
	}
}

export default class Step extends Component {
	handleRemove () {
		this.props.removeStep(this.props.index);
	}
	render() {
		const { step: { method, cbs }, upStep, ui, index } = this.props;

		return (
				<li className={"step step-" + method}>
					<button className="step-remove" onClick={::this.handleRemove} title="Remove this step">×</button>
					<div className="step-title">Step {index}</div>
					<Method method={method} index={index} upStepPromiseState={upStep.promise.state} intermediatePromises={ui.intermediatePromises} />
					<StepsCbs cbs={cbs} />
					<div>){ui.intermediatePromises ? ";" : ""}</div>
				</li>
		);
	}
}
