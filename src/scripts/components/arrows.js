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
					<div className="step-arrow fulfilled">{parentState === "fulfilled" ? "⬇" : ""}</div>
					<div className="step-arrow rejected">{parentState === "rejected" ? "⬇" : ""}</div>
				</div>
			);
		}

		// diagonal arrows

		if (grandParentState === "fulfilled") {
			return (
				<div className="step-arrows">
					<div className="step-arrow-diagonal rejected">⬊</div>
				</div>
			);
		}
		if (grandParentState === "rejected") {
			return (
				<div className="step-arrows">
					<div className="step-arrow-diagonal fulfilled">⬋</div>
				</div>
			);
		}
	}
}
