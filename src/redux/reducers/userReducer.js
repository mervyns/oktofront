import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import * as types from "../types/userTypes";

const modal = createReducer(false, {
  [types.toggleModal]: state => !state
});

export default combineReducers({
  modal: modalReducer
});
