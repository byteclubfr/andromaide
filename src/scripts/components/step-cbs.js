"use strict";

import React, { Component } from "react";
import classNames from "classnames";

class OnFulfilled extends Component {
	// typing in the textarea
	handleChange(event) {
		this.props.onChange(event.target.value);
	}

	render () {
		const { body, disabled, index, notCalled, anonymous } = this.props;

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
		const { body, disabled, index, notCalled, anonymous } = this.props;

		return (
			<div className={classNames("step-cb", "on-rejected", { "not-called": notCalled })}>
				function <span>{anonymous ? "" : "onRejected" + index}</span> (err) &#123;
					<textarea value={body} onChange={::this.handleChange} disabled={disabled}></textarea>
				&#125;
			</div>
		);
	}
}

// Cbs = Callbacks
export default class Cbs extends Component {
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
							anonymous={!ui.cbsName}
						/>
					: <OnRejected
							key="rejected"
							body={cb.body}
							index={index}
							onChange={actions.changeOnRejectedBody.bind(null, index)}
							disabled={ui.settled}
							notCalled={ui.settled && parentStepPromiseState === "fulfilled"}
							anonymous={!ui.cbsName}
						/>
				)}
			</div>
		);
	}
}
