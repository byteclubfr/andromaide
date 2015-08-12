"use strict";

import React, { Component } from "react";
import PromiseId from "./promise-id";

class SourceButtons extends Component {
	handleResolve () {
		this.props.resolve(this.props.initValue, 0);
	}
	handleReject () {
		this.props.reject(this.props.initValue, 0);
	}
	render () {
		const { disabled } = this.props;

		return (
			<div>
				<button className="resolve" onClick={::this.handleResolve} disabled={disabled}>Resolve</button>
				<button className="reject" onClick={::this.handleReject} disabled={disabled}>Reject</button>
			</div>
		);
	}
}

export default class Source extends Component {
	render () {
		const { step, ui, actions } = this.props;
		var assign;

		// snippets
		const shortSnippet = ``;
		const longSnippet =
`
var value = "${step.initValue}";
function executor (resolve, reject) {
	buttons.onclick = _.once(function (event) {
		if (event.target.textConent === 'Resolve') {
			resolve(value);
		} else {
			reject(value);
		}
	});
}
`;
		const snippet = true ? longSnippet : shortSnippet;

		if (ui.intermediatePromises) {
			assign = [
				<span>var </span>,
				<PromiseId id="Source" promiseState={step.promise.state} />,
				<span> = new Promise(executor);</span>
			];
		} else {
			assign = "(new Promise(executor))";
		}

		return (
				<div className="source">
					<strong>Source promise</strong>
					<span className={step.promise.state}>State: {step.promise.state}</span>
					<span>Value: "{step.initValue}"</span>
					<pre>{snippet}</pre>
					<div>{assign}</div>
					<SourceButtons {...actions} initValue={step.initValue} disabled={step.promise.state !== "pending"} />
				</div>
		);
	}
}
