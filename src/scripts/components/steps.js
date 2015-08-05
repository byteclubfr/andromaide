"use strict";

import React, { Component } from "react";
import Step from "./step";

export default class Steps extends Component {
	render () {
		const { steps, ui, actions } = this.props;

		return (
				<ul className="steps">
					{steps.map((step, i) => <Step key={i} step={step} index={i} ui={ui} {...actions} />)}
				</ul>
		);
	}
}
