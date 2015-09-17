import { tail } from "lodash";
import React, { Component, PropTypes } from "react";
import Step from "./step";

export default class Steps extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		steps: PropTypes.array.isRequired,
		ui: PropTypes.object.isRequired
	}

	render () {
		const { actions, steps, ui } = this.props;
		let stepComps = tail(steps).map((step, i) =>
			<Step
				actions={actions}
				index={i + 1}
				key={i + 1}
				parentStep={steps[i]}
				step={step}
				ui={ui}
			/>
		);
		if (!stepComps.length) {
			stepComps = <div className="no-steps">No steps yet!</div>;
		}

		// tail removes the source (step[0])
		return (
			<ul className="steps">{stepComps}</ul>
		);
	}
}
