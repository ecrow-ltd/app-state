import React, { Component } from "react";
import { Provider } from "react-redux";

export interface IProps {
  store: any;
}

export interface IState {}

export default class Root extends Component<IProps, IState> {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <div>
            Redux state initiated. Start the{" "}
            <strong>Remote Redux Server</strong> to view
          </div>
        </div>
      </Provider>
    );
  }
}
