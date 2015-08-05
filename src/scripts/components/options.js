"use strict";

import React, { Component } from "react";

export default class Options extends Component {
	handleChange () {
		this.props.actions.toggleIntermediatePromises();
	}
	render () {
		const { ui:{ intermediatePromises }} = this.props;

		return (
				<form className="options">
					<h2>Options</h2>
					<label>Show intermediate promises <input type="checkbox" checked={intermediatePromises} onChange={::this.handleChange} /></label>
				</form>
		);
	}
}

