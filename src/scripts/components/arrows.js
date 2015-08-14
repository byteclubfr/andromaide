"use strict";

import React, { Component, PropTypes } from "react";

class ArrowValue extends Component {
	static propTypes = {
		value: PropTypes.node
	}

	render () {
		const { value } = this.props;
		let v = typeof value == "object" && value.message ? value.message : value;

		return (
			<div className="step-arrow-value">{JSON.stringify(v)}</div>
		);
	}
}

export default class Arrows extends Component {
	static propTypes = {
		parentStep: PropTypes.object.isRequired
	}

	render () {
		const { parentStep } = this.props;
		const grandParentState = parentStep.parentStepPromiseState;
		const parentState = parentStep.promise.state;

		if (parentState === "pending") return <div />;

		// vertical arrows
		if (!grandParentState || parentState === grandParentState) {
			return (
				<div className="step-arrows">
					<div className="step-arrow fulfilled">
						<ArrowValue value={parentState === "fulfilled" ? parentStep.promise.value : ""} />
						<div className="step-arrow-icon">{parentState === "fulfilled" ? "⬇" : ""}</div>
					</div>
					<div className="step-arrow rejected">
						<ArrowValue value={parentState === "rejected" ? parentStep.promise.value : ""} />
						<div className="step-arrow-icon">{parentState === "rejected" ? "⬇" : ""}</div>
					</div>
				</div>
			);
		}

		// diagonal arrows

		if (grandParentState === "fulfilled") {
			return (
				<div className="step-arrows">
					<div className="step-arrow-diagonal rejected">
						<ArrowValue value={parentStep.promise.value} />
						<div className="step-arrow-icon">⬊</div>
					</div>
				</div>
			);
		}
		if (grandParentState === "rejected") {
			return (
				<div className="step-arrows">
					<div className="step-arrow-diagonal fulfilled">
						<ArrowValue value={parentStep.promise.value} />
						<div className="step-arrow-icon">⬋</div>
					</div>
				</div>
			);
		}
	}
}
