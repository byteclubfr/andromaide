"use strict";

import React, { Component } from "react";
import classNames from "classnames";

export default class Options extends Component {
	render () {
		const {
			actions: { toggleOptions, toggleExecutor, toggleIntermediatePromises, toggleCbsName },
			ui:{ options, executor, intermediatePromises, cbsName }
		} = this.props;

		return (
				<div>
					<button className="options-toggle" onClick={toggleOptions}>Toggle options</button>
					<form className={classNames("options", { hidden: !options })}>
						<h2>Options</h2>
						<div><label>Show executor <input type="checkbox" checked={executor} onChange={toggleExecutor} /></label></div>
						<div><label>Show intermediate promises <input type="checkbox" checked={intermediatePromises} onChange={toggleIntermediatePromises} /></label></div>
						<div><label>Show callback names <input type="checkbox" checked={cbsName} onChange={toggleCbsName} /></label></div>
					</form>
				</div>
		);
	}
}

