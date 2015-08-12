"use strict";

import React, { Component } from "react";

export default class StepButtons extends Component {
	handleThen1 () {
		this.props.actions.addThen1();
	}
	handleThen2 () {
		this.props.actions.addThen2();
	}
	handleCatch () {
		this.props.actions.addCatch();
	}
	render () {
		return (
			<div>
				<button className="add-then2" onClick={::this.handleThen2}>Add .then(onFulfilled, onRejected)</button>
				<button className="add-then1" onClick={::this.handleThen1}>Add .then(onFulfilled)</button>
				<button className="add-catch" onClick={::this.handleCatch}>Add .catch(onRejected)</button>
			</div>
		);
	}
}
