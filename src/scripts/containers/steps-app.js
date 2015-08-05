"use strict";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Connector } from "redux/react";

import * as StepActions from "../actions/actions";

import Options from "../components/options";
import Source from "../components/source";
import Steps from "../components/steps";
import StepButtons from "../components/step-buttons";

export default class StepsApp extends Component {
	render () {
		return (
			<Connector select={state => ({ source: state.source, steps: state.steps, ui: state.ui })}>
				{this.renderChild}
			</Connector>
		);
	}
	renderChild ({ source, steps, ui, dispatch }) {
		const actions = bindActionCreators(StepActions, dispatch);

		return (
			<div>
				<Options ui={ui} actions={actions} />
				<Source source={source} ui={ui} actions={actions} />
				<Steps steps={steps} ui={ui} actions={actions} />
				<StepButtons actions={actions} />
			</div>
		);
	}
}
