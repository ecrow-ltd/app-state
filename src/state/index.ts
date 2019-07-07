import { createStore, combineReducers } from "redux";
import todoApp from "./reducers/todo";

export const reducers = todoApp;

export default createStore(reducers);
