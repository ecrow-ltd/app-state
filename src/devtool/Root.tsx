import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DevTools from './containers/DevTools';

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
          <DevTools />
        </div>
      </Provider>
    );
  }
}
