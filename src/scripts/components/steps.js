"use strict";

import { tail } from "lodash";
import React, { Component, PropTypes } from "react";
import Step from "./step";

export default class Steps extends Component {
	render () {
		const { actions, steps, ui } = this.props;

		// tail removes the source (step[0])
		return (
			<ul className="steps">
				{tail(steps).map((step, i) =>
					<Step
						actions={actions}
						key={i + 1}
						index={i + 1}
						parentStep={steps[i]}
						step={step}
						ui={ui}
					/>
				)}
			</ul>
		);
	}
}

Steps.propTypes = {
	actions: PropTypes.object.isRequired,
	steps: PropTypes.array.isRequired,
	ui: PropTypes.object.isRequired
};
