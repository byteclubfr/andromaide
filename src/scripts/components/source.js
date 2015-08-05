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
		const { source, ui, actions } = this.props;
		var promise;

		// snippets
		if (ui.intermediatePromises) {
			promise = "var promiseSource = new Promise(executor);";
		} else {
			promise = "(new Promise(executor))";
		}
		const shortSnippet = ``;
		const longSnippet =
`
var value = "${source.value}";
function executor (resolve, reject) {
	buttons.onclick = _.once(function (event) {
		if (event.target.textConent === 'Resolve') {
			resolve(value);
		} else {
			reject(value);
		}
	});
}
${promise}
`;
		const snippet = true ? longSnippet : shortSnippet;

		return (
				<div className="source">
					<strong>Source promise</strong>
					<span className={source.promiseState}>State: { source.promiseState }</span>
					<span>Value: "{source.value}"</span>
					<pre>{snippet}</pre>
					<SourceButtons {...actions} disabled={source.promiseState !== "pending"} />
				</div>
		);
	}
}
