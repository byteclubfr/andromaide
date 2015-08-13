"use strict";

import React, { Component } from "react";
import classNames from "classnames";

export default class Options extends Component {
	render () {
		const {
			actions: { toggleOptions, toggleIntermediatePromises },
			ui:{ options, intermediatePromises }
		} = this.props;

		return (
				<div>
					<button className="options-toggle" onClick={toggleOptions}>Toggle options</button>
					<form className={classNames("options", { hidden: !options })}>
						<h2>Options</h2>
						<label>Show intermediate promises <input type="checkbox" checked={intermediatePromises} onChange={toggleIntermediatePromises} /></label>
					</form>
				</div>
		);
	}
}

