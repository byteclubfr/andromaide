"use strict";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Connector } from "redux/react";

import * as StepActions from "../actions/actions";

import Source from "../components/source";
import Steps from "../components/steps";
import StepButtons from "../components/step-buttons";

export default class StepsApp extends Component {
	render() {
		return (
			<Connector select={state => ({ source: state.source, steps: state.steps })}>
				{this.renderChild}
			</Connector>
		);
	}

	renderChild({ source, steps, dispatch }) {
		const actions = bindActionCreators(StepActions, dispatch);

		return (
			<div>
				<Source source={source} actions={actions} />
				<Steps steps={steps} actions={actions} />
				<StepButtons actions={actions} />
			</div>
		);
	}
}
