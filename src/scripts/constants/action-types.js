/*
 - Consistent naming in one place
 - Better debug: typos will get undefined
 */

// ui options form
export const TOGGLE_OPTIONS = "TOGGLE_OPTIONS";
export const TOGGLE_EXECUTOR = "TOGGLE_EXECUTOR";
export const TOGGLE_INTERMEDIATE_PROMISES = "TOGGLE_INTERMEDIATE_PROMISES";
export const TOGGLE_CBS_NAME = "TOGGLE_CBS_NAME";

// source
export const CHANGE_INIT_VALUE = "CHANGE_INIT_VALUE";
export const FULFILL = "FULFILL";
export const REJECT = "REJECT";

// steps
export const ADD_CATCH = "ADD_CATCH";
export const ADD_THEN1 = "ADD_THEN1";
export const ADD_THEN2 = "ADD_THEN2";
export const REMOVE_STEP = "REMOVE_STEP";

// steps callbacks
export const ADD_ON_FULFILLED = "ADD_ON_FULFILLED";
export const ADD_ON_REJECTED = "ADD_ON_REJECTED";
export const CHANGE_ON_FULFILLED_BODY = "CHANGE_ON_FULFILLED_BODY";
export const CHANGE_ON_REJECTED_BODY = "CHANGE_ON_REJECTED_BODY";
export const REMOVE_ON_FULFILLED = "REMOVE_ON_FULFILLED";
export const REMOVE_ON_REJECTED = "REMOVE_ON_REJECTED";
