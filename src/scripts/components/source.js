"use strict";

import React, { Component, PropTypes } from "react";
import classNames from "classnames";

import PromiseId from "./promise-id";
import SourceButtons from "./source-buttons";

export default class Source extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		step: PropTypes.object.isRequired,
		ui: PropTypes.object.isRequired
	}

	// typing in the input
	handleChangeInitValue (event) {
		this.props.actions.changeInitValue(event.target.value);
	}

	render () {
		const { actions, step, ui } = this.props;
		const disabled = Boolean(ui.settled);
		var assign;

		// snippets
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
		const snippet = longSnippet;

		if (ui.intermediatePromises) {
			assign = [
				<span key="declaration-type">var </span>,
				<PromiseId id="Source" key="id" promiseState={step.promise.state} />,
				<span key="declaration-init"> = new Promise(executor);</span>
			];
		} else {
			assign = "(new Promise(executor))";
		}

		return (
				<div className="source">
					<div className="source-title">Source</div>
					<div className="source-init-value">var initValue = <input disabled={disabled} onChange={::this.handleChangeInitValue} value={step.initValue} />;</div>
					<pre className={classNames("source-snippet", { hidden: !ui.executor })}>{snippet}</pre>
					<div className="source-assign">{assign}</div>
					<SourceButtons {...actions} disabled={disabled} initValue={step.initValue} />
				</div>
		);
	}
}
