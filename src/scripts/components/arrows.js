"use strict";

import React, { Component } from "react";

export default class Arrows extends Component {
	render () {
		const { parentStep } = this.props;
		const grandParentState = parentStep.parentStepPromiseState;
		const parentState = parentStep.promise.state;

		// vertical arrows
		if (!grandParentState || parentState === grandParentState) {
			return (
				<div className="step-arrows">
					<div className="step-arrow fulfilled">{ parentState === "fulfilled" ? "⬇" : ""}</div>
					<div className="step-arrow rejected">{ parentState === "rejected" ? "⬇" : ""}</div>
				</div>
			);
		}

		// diagonal arrows

		if (grandParentState === "fulfilled" && parentState !== "pending") {
			return (
				<div className="step-arrows">
					<div className="step-arrow-diagonal rejected">⬊</div>
				</div>
			);
		}
		if (grandParentState === "rejected" && parentState !== "pending") {
			return (
				<div className="step-arrows">
					<div className="step-arrow-diagonal fulfilled">⬋</div>
				</div>
			);
		}
		return <div />;
	}
}

