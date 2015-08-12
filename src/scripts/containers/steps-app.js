"use strict";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as StepActions from "../actions/actions";

import Options from "../components/options";
import Source from "../components/source";
import Steps from "../components/steps";
import StepButtons from "../components/step-buttons";

// selector, can use reselect for complex stuff
function mapStateToProps (state) {
	return {
		steps: state.steps,
		ui: state.ui
	};
}

function mapDispatchToProps (dispatch) {
	return { actions: bindActionCreators(StepActions, dispatch) };
}

export default class StepsApp extends Component {
	render () {
		// from mapStateToProps and mapStateToProps
		const { steps, ui, actions } = this.props;

		return (
			<div>
				<Options ui={ui} actions={actions} />
				<Source step={steps[0]} ui={ui} actions={actions} />
				<Steps steps={steps} ui={ui} actions={actions} />
				<StepButtons actions={actions} />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StepsApp);
