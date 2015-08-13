"use strict";

import React, { Component } from "react";
import classNames from "classnames";

import PromiseId from "./promise-id";
import SourceButtons from "./source-buttons";

export default class Source extends Component {
	handleChangeInitValue(event) {
		this.props.actions.changeInitValue(event.target.value);
	}
	render () {
		const { step, ui, actions } = this.props;
		var assign;

		// snippets
		const shortSnippet = "";
		const longSnippet =
`
function executor (resolve, reject) {
	buttons.onclick = _.once(function (event) {
		if (event.target.textContent === "Fulfill") {
			resolve(initValue);
		} else {
			reject(initValue);
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
					<div className="source-title">Source</div>
					<div className="source-init-value">var initValue = <input value={step.initValue} onChange={::this.handleChangeInitValue} disabled={ui.settled} /></div>
					<pre className={classNames("source-snippet", { hidden: !ui.executor })}>{snippet}</pre>
					<div className="source-assign">{assign}</div>
					<SourceButtons {...actions} initValue={step.initValue} disabled={ui.settled} />
				</div>
		);
	}
}
