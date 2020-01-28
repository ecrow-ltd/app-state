import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { reducers } from '../state';
import Root from './Root';
import DevTools from './containers/DevTools';

// const composeEnhancers = composeWithDevTools({
//   name: "app-state",
//   realtime: true,
//   hostname: "localhost",
//   port: 2770
// });
// const enhancer = composeEnhancers();

const enhancer = compose(DevTools.instrument());

const store = createStore(reducers, enhancer);

ReactDOM.render(
  <div style={{ height: '100%' }}>
    <Root store={store} />
  </div>,
  document.getElementById('app')
);
