"use strict";

import React, { Component } from "react";

export default class StepButtons extends Component {
	render () {
		const { addThen1, addThen2, addCatch } = this.props.actions;

		return (
			<div className="step-add-buttons">
				<button className="add-then2" onClick={addThen2}>Add .then(onFulfilled, onRejected)</button>
				<button className="add-then1" onClick={addThen1}>Add .then(onFulfilled)</button>
				<button className="add-catch" onClick={addCatch}>Add .catch(onRejected)</button>
			</div>
		);
	}
}
