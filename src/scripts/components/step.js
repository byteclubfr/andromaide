import React, { Component, PropTypes } from "react";
import { DragSource, DropTarget } from 'react-dnd';

import { STEP } from "../constants/dnd-types";

import Arrows from "./arrows";
import Cbs from "./step-cbs";
import Method from "./step-method";

// dnd spec
const stepDragSource = {
	// return the data describing the dragged item
	beginDrag (props) {
		return { index: props.index };
	},

	endDrag (props, monitor) {
		if (monitor.didDrop()) {
			props.actions.moveStep(monitor.getItem().index, monitor.getDropResult().index);
		}
	}
};

const stepDropTarget = {
	drop (props) {
		return { index: props.index };
	}
};

@DragSource(STEP, stepDragSource, (connect, monitor) => ({
	connectDragPreview: connect.dragPreview(),
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))
@DropTarget(STEP, stepDropTarget, connect => ({
	connectDropTarget: connect.dropTarget()
}))
export default class Step extends Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		parentStep: PropTypes.object.isRequired,
		step: PropTypes.object.isRequired,
		ui: PropTypes.object.isRequired
	}

	// click on the top right cross
	handleRemove () {
		this.props.actions.removeStep(this.props.index);
	}

	render () {
		const { actions, index, parentStep, step: { method, cbs, promise }, ui } = this.props;
		const { connectDragSource, connectDropTarget, connectDragPreview, isDragging } = this.props;
		const opacity = isDragging ? 0.2 : 1;

		return connectDragPreview(connectDropTarget(
			<li className={"step step-" + method} style={{opacity}}>
				<button className="step-remove" disabled={promise.state !== "pending"} onClick={::this.handleRemove} title="Remove this step">×</button>
				{connectDragSource(<div className="step-title">Step {index}</div>)}
				<Arrows parentStep={parentStep} />
				<Method
					index={index}
					intermediatePromises={ui.intermediatePromises}
					method={method}
					parentStepPromiseState={parentStep.promise.state}
					promise={promise}
				/>
				<Cbs
					actions={actions}
					cbs={cbs}
					index={index}
					parentStepPromiseState={parentStep.promise.state}
					ui={ui}
				/>
				<div className="step-method-end"><strong>){ui.intermediatePromises ? ";" : ""}</strong></div>
			</li>
		));
	}
}

