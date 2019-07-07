import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "remote-redux-devtools";
import { reducers } from "../state";
import * as actions from "../state/actions/todo";
import Root from "./containers/Root";

const composeEnhancers = composeWithDevTools({
  name: "app-state",
  realtime: true,
  hostname: "localhost",
  port: 8000
});
const enhancer = composeEnhancers();

const store = createStore(reducers, enhancer);

ReactDOM.render(
  <div>
    <iframe
      src="http://localhost:8000"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%"
      }}
    />
  </div>,
  document.getElementById("app")
);
