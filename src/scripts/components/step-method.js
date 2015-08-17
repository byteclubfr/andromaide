"use strict";

import React, { Component, PropTypes } from "react";
import PromiseId from "./promise-id";

// then, catch
export default class Method extends Component {
	static propTypes = {
		index: PropTypes.number.isRequired,
		intermediatePromises: PropTypes.bool.isRequired,
		method: PropTypes.string.isRequired,
		parentStepPromiseState: PropTypes.string.isRequired,
		promise: PropTypes.object.isRequired
	}

	render () {
		const { index, intermediatePromises, method, parentStepPromiseState, promise } = this.props;
		const parentStepIndex = index === 1 ? "Source" : index - 1;

		var assign;
		if (intermediatePromises) {
			assign = [
				<span key="declaration-type">var </span>,
				<PromiseId id={index} key="id" promiseState={promise.state} />,
				<span key="op"> = </span>,
				<PromiseId id={parentStepIndex} key="declaration-init" promiseState={parentStepPromiseState} />
			];
		}

		return (
			<div className="step-method">{assign}<strong>.{method}(</strong></div>
		);
	}
}
