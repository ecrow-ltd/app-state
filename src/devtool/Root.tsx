import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './application/App';
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
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flex: 7 }}>
            <App />
          </div>
          <div style={{ flex: 6, minWidth: 550 }}>
            <DevTools />
          </div>
        </div>
      </Provider>
    );
  }
}
