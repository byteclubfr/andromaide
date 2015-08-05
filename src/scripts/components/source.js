"use strict";

import React, { Component } from "react";

class SourceButtons extends Component {
	handleResolve () {
		this.props.resolve();
	}
	handleReject () {
		this.props.reject();
	}
	render () {
		return (
			<div>
				<button className="resolve" onClick={::this.handleResolve} disabled={this.props.disabled}>Resolve</button>
				<button className="reject" onClick={::this.handleReject} disabled={this.props.disabled}>Reject</button>
			</div>
		);
	}
}

export default class Source extends Component {
	render () {
		const { source, actions } = this.props;

		return (
				<div className="source">
					<strong>Source promise</strong>
					- <span className={source.promiseState}>State: { source.promiseState }</span>
					- Value: {source.value}
					<SourceButtons {...actions} disabled={source.promiseState !== "pending"} />
				</div>
		);
	}
}
