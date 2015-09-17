// React needs to be included for all components for JSX desuggaring
import React, { Component } from "react";
import { Provider } from "react-redux";

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

import configureStore from "../store/configure-store";
import StepsApp from "./steps-app";

const store = configureStore();

@DragDropContext(HTML5Backend)
export default class App extends Component {
	render () {
		// anonymous fn because of how context works in react 0.13
		// <Provider> makes the store available to the connect() calls in the comp hierarchy below
		return (
			<Provider store={store}>
				{() => <StepsApp />}
			</Provider>
		);
	}
}

