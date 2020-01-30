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
          <div className="application" style={{ flex: 5 }}>
            <App />
          </div>
          <div
            style={{
              flex: 3,
              minWidth: 500,
              boxShadow:
                '0 0 8px 4px rgba(0, 0, 0, 0.2), 0 0 20px 0 rgba(0, 0, 0, 0.19)'
            }}
          >
            <DevTools />
          </div>
        </div>
      </Provider>
    );
  }
}
