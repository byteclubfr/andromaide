"use strict";

import React, { Component, PropTypes } from "react";

export default class SourceButtons extends Component {
	static propTypes = {
		disabled: PropTypes.bool.isRequired,
		fulfill: PropTypes.func.isRequired,
		initValue: PropTypes.string.isRequired,
		reject: PropTypes.func.isRequired
	}

	handleFulfill () {
		this.props.fulfill(eval(this.props.initValue), 0);
	}

	handleReject () {
		this.props.reject(eval(this.props.initValue), 0);
	}

	render () {
		const { disabled } = this.props;

		return (
			<div className="source-buttons">
				<button className="fulfill" disabled={disabled} onClick={::this.handleFulfill}>Fulfill</button>
				<button className="reject" disabled={disabled} onClick={::this.handleReject}>Reject</button>
			</div>
		);
	}
}
