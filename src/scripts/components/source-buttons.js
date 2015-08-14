"use strict";

import React, { Component } from "react";

export default class SourceButtons extends Component {
	handleFulfill () {
		this.props.fulfill(this.props.initValue, 0);
	}

	handleReject () {
		this.props.reject(this.props.initValue, 0);
	}

	render () {
		const { disabled } = this.props;

		return (
			<div className="source-buttons">
				<button className="fulfill" onClick={::this.handleFulfill} disabled={disabled}>Fulfill</button>
				<button className="reject" onClick={::this.handleReject} disabled={disabled}>Reject</button>
			</div>
		);
	}
}
