"use strict";

import React, { Component } from "react";

export default class PromiseId extends Component {
	render () {
		const { id, promiseState } = this.props;

		return (
				<span className={"promise-id " + promiseState}>promise{id}</span>
		);
	}
}

