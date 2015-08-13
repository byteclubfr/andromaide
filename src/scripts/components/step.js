"use strict";

import React, { Component } from "react";
import classNames from "classnames";
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
		const { cbs, actions, index, ui, parentStepPromiseState } = this.props;

		return (
			<div className="step-cbs">
				{cbs.map(cb => cb.type === "fulfilled"
					? <OnFulfilled
							key="fulfilled"
							index={index}
							body={cb.body}
							onChange={actions.changeOnFulfilledBody.bind(null, index)}
							disabled={ui.settled}
							notCalled={ui.settled && parentStepPromiseState === "rejected"}
						/>
					: <OnRejected
							key="rejected"
							body={cb.body}
							index={index}
							onChange={actions.changeOnRejectedBody.bind(null, index)}
							disabled={ui.settled}
							notCalled={ui.settled && parentStepPromiseState === "fulfilled"}
						/>
				)}
			</div>
		);
	}
}

class OnFulfilled extends Component {
	handleChange(event) {
		this.props.onChange(event.target.value);
	}
	render () {
		const { body, disabled, index, notCalled } = this.props;

		return (
			<div className={classNames("step-cb", "on-fulfilled", { "not-called": notCalled })}>
				function onFulfilled{index} (data) &#123;
					<textarea value={body} onChange={::this.handleChange} disabled={disabled}></textarea>
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
		const { body, disabled, index, notCalled } = this.props;

		return (
			<div className={classNames("step-cb", "on-rejected", { "not-called": notCalled })}>
				function onRejected{index} (err) &#123;
					<textarea value={body} onChange={::this.handleChange} disabled={disabled}></textarea>
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
