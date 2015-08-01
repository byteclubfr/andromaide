"use strict";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Connector } from "redux/react";

import * as StepActions from "../actions/actions";

import Steps from "../components/steps";
import Buttons from "../components/buttons";

export default class StepsApp extends Component {
	render() {
		return (
			<Connector select={state => ({ steps: state.steps })}>
				{this.renderChild}
			</Connector>
		);
	}

	renderChild({ steps, dispatch }) {
		const actions = bindActionCreators(StepActions, dispatch);

		return (
			<div>
				<Steps steps={steps} actions={actions} />
				<Buttons actions={actions} />
			</div>
		);
	}
}
