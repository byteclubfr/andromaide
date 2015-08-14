"use strict";

import React, { Component, PropTypes } from "react";
import classNames from "classnames";

class OnFulfilled extends Component {
	// typing in the textarea
	handleChange (event) {
		this.props.onChange(event.target.value);
	}

	render () {
		const { anonymous, body, disabled, index, notCalled } = this.props;

		return (
			<div className={classNames("step-cb", "on-fulfilled", { "not-called": notCalled })}>
				function <span>{anonymous ? "" : "onFulfilled" + index}</span>(data) &#123;
					<textarea disabled={disabled} onChange={::this.handleChange} value={body}></textarea>
				&#125;
			</div>
		);
	}
}

class OnRejected extends Component {
	// typing in the textarea
	handleChange (event) {
		this.props.onChange(event.target.value);
	}

	render () {
		const { anonymous, body, disabled, index, notCalled } = this.props;

		return (
			<div className={classNames("step-cb", "on-rejected", { "not-called": notCalled })}>
				function <span>{anonymous ? "" : "onRejected" + index}</span> (err) &#123;
					<textarea disabled={disabled} onChange={::this.handleChange} value={body}></textarea>
				&#125;
			</div>
		);
	}
}

OnFulfilled.propTypes = OnRejected.propTypes = {
	anonymous: PropTypes.bool.isRequired,
	body: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	notCalled: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired
};

// Cbs = Callbacks
export default class Cbs extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		cbs: PropTypes.array.isRequired,
		index: PropTypes.number.isRequired,
		parentStepPromiseState: PropTypes.string.isRequired,
		ui: PropTypes.object.isRequired
	}

	render () {
		const { actions, cbs, index, parentStepPromiseState, ui } = this.props;
		const disabled = parentStepPromiseState !== "pending";

		return (
			<div className="step-cbs">
				{cbs.map(cb => cb.type === "fulfilled"
					? <OnFulfilled
							anonymous={!ui.cbsName}
							body={cb.body}
							disabled={disabled}
							index={index}
							key="fulfilled"
							notCalled={disabled && parentStepPromiseState === "rejected"}
							onChange={actions.changeOnFulfilledBody.bind(null, index)}
						/>
					: <OnRejected
							anonymous={!ui.cbsName}
							body={cb.body}
							disabled={disabled}
							index={index}
							key="rejected"
							notCalled={disabled && parentStepPromiseState === "fulfilled"}
							onChange={actions.changeOnRejectedBody.bind(null, index)}
						/>
				)}
			</div>
		);
	}
}
