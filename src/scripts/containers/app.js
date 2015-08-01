"use strict";

import React, { Component } from "react";
import { createRedux } from "redux";
import { Provider } from "redux/react";

import StepsApp from "./steps-app";
import * as stores from "../stores";

const redux = createRedux(stores);

export default class App extends Component {
	render() {
		return (
			<Provider redux={redux}>
				{() => <StepsApp />}
			</Provider>
		);
	}
}

