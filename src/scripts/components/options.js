import React, { Component, PropTypes } from "react";
import classNames from "classnames";

export default class Options extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		ui: PropTypes.object.isRequired
	}

	// typing in the input
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
						<div><label>Show executor <input checked={executor} onChange={toggleExecutor} type="checkbox" /></label></div>
						<div><label>Show intermediate promises <input checked={intermediatePromises} onChange={toggleIntermediatePromises} type="checkbox" /></label></div>
						<div><label>Show callback names <input checked={cbsName} onChange={toggleCbsName} type="checkbox" /></label></div>
						<div><label>Fake delay <input onChange={::this.handleChangeFakeDelay} type="number" value={fakeDelay} /></label></div>
					</form>
				</div>
		);
	}
}
