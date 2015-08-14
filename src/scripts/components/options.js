"use strict";

import React, { Component, PropTypes } from "react";
import classNames from "classnames";

export default class Options extends Component {
	// typing in input
	handleChangeFakeDelay (event) {
		this.props.actions.changeFakeDelay(event.target.value);
	}

	render () {
		const {
			actions: { toggleOptions, toggleExecutor, toggleIntermediatePromises, toggleCbsName },
			ui:{ options, executor, intermediatePromises, cbsName, fakeDelay }
		} = this.props;

		return (
				<div>
					<button className="options-toggle" onClick={toggleOptions}>Toggle options</button>
					<form className={classNames("options", { hidden: !options })}>
						<h2>Options</h2>
						<div><label>Show executor <input type="checkbox" checked={executor} onChange={toggleExecutor} /></label></div>
						<div><label>Show intermediate promises <input type="checkbox" checked={intermediatePromises} onChange={toggleIntermediatePromises} /></label></div>
						<div><label>Show callback names <input type="checkbox" checked={cbsName} onChange={toggleCbsName} /></label></div>
						<div><label>Fake delay <input type="number" value={fakeDelay} onChange={::this.handleChangeFakeDelay} /></label></div>
					</form>
				</div>
		);
	}
}

Options.propTypes = {
	actions: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired
};
