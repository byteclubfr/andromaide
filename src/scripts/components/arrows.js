"use strict";

import React, { Component, PropTypes } from "react";

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
						<div>{parentState === "fulfilled" ? parentStep.promise.value : ""}</div>
						<div className="step-arrow-icon">{parentState === "fulfilled" ? "⬇" : ""}</div>
					</div>
					<div className="step-arrow rejected">
						<div>{parentState === "rejected" ? parentStep.promise.value : ""}</div>
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
						<div>{parentStep.promise.value}</div>
						<div className="step-arrow-icon">⬊</div>
					</div>
				</div>
			);
		}
		if (grandParentState === "rejected") {
			return (
				<div className="step-arrows">
					<div className="step-arrow-diagonal fulfilled">
						<div>{parentStep.promise.value}</div>
						<div className="step-arrow-icon">⬋</div>
					</div>
				</div>
			);
		}
	}
}
