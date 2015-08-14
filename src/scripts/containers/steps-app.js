"use strict";

import React, { Component, PropTypes } from "react";
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

class StepsApp extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		steps: PropTypes.array.isRequired,
		ui: PropTypes.object.isRequired
	}

	render () {
		// from mapStateToProps and mapStateToProps
		const { actions, steps, ui } = this.props;

		return (
			<div>
				<Options actions={actions} ui={ui} />
				<Source actions={actions} step={steps[0]} ui={ui} />
				<Steps {...this.props} />
				<StepButtons actions={actions} />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StepsApp);
