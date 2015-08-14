"use strict";

import React, { Component, PropTypes } from "react";

export default class PromiseId extends Component {
	static propTypes = {
		id: PropTypes.number.isRequired,
		promiseState: PropTypes.string.isRequired
	}

	render () {
		const { id, promiseState } = this.props;

		return (
				<span className={"promise-id " + promiseState}>promise{id}</span>
		);
	}
}

