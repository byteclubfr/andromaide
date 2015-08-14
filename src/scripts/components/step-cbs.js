"use strict";

import React, { Component, PropTypes } from "react";
import classNames from "classnames";

class OnFulfilled extends Component {
	// typing in the textarea
	handleChange(event) {
		this.props.onChange(event.target.value);
	}

	render () {
		const { anonymous, body, disabled, index, notCalled } = this.props;

		return (
			<div className={classNames("step-cb", "on-fulfilled", { "not-called": notCalled })}>
				function <span>{anonymous ? "" : "onFulfilled" + index}</span>(data) &#123;
					<textarea value={body} onChange={::this.handleChange} disabled={disabled}></textarea>
				&#125;
			</div>
		);
	}
}

class OnRejected extends Component {
	// typing in the textarea
	handleChange(event) {
		this.props.onChange(event.target.value);
	}

	render () {
		const { anonymous, body, disabled, index, notCalled } = this.props;

		return (
			<div className={classNames("step-cb", "on-rejected", { "not-called": notCalled })}>
				function <span>{anonymous ? "" : "onRejected" + index}</span> (err) &#123;
					<textarea value={body} onChange={::this.handleChange} disabled={disabled}></textarea>
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
	notCalled: PropTypes.bool.isRequired
};

// Cbs = Callbacks
export default class Cbs extends Component {
	render () {
		const { actions, cbs, index, parentStepPromiseState, ui } = this.props;
		const disabled = Boolean(ui.settled);

		return (
			<div className="step-cbs">
				{cbs.map(cb => cb.type === "fulfilled"
					? <OnFulfilled
							key="fulfilled"
							index={index}
							body={cb.body}
							onChange={actions.changeOnFulfilledBody.bind(null, index)}
							disabled={disabled}
							notCalled={disabled && parentStepPromiseState === "rejected"}
							anonymous={!ui.cbsName}
						/>
					: <OnRejected
							key="rejected"
							body={cb.body}
							index={index}
							onChange={actions.changeOnRejectedBody.bind(null, index)}
							disabled={disabled}
							notCalled={disabled && parentStepPromiseState === "fulfilled"}
							anonymous={!ui.cbsName}
						/>
				)}
			</div>
		);
	}
}

Cbs.propTypes = {
	actions: PropTypes.object.isRequired,
	cbs: PropTypes.array.isRequired,
	index: PropTypes.number.isRequired,
	parentStepPromiseState: PropTypes.string.isRequired,
	ui: PropTypes.object.isRequired
};
