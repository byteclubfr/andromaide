"use strict";

import React, { Component } from "react";

// then, catch
class Method extends Component {
	render () {
		const { method, index, intermediatePromises } = this.props;
		const previousIndex = index === 0 ? "Source" : index - 1;
		const assign = intermediatePromises
			? `var promise${index} = promise${previousIndex}`
			: "";

		return (
			<div className="step-method">{assign}.{method}(</div>
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
		const { step: { method, cbs }, ui, index } = this.props;

		return (
				<li className={"step step-" + method}>
					<button className="step-remove" onClick={::this.handleRemove} title="Remove this step">×</button>
					<div className="step-title">Step {index}</div>
					<Method method={method} index={index} intermediatePromises={ui.intermediatePromises} />
					<StepsCbs cbs={cbs} />
					<div>)</div>
				</li>
		);
	}
}
