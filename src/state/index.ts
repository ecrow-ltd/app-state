import { createStore, combineReducers } from 'redux';
import '@reducer/index';
import State from './State';

export const reducers = combineReducers(State.mapMethods());

export default createStore(reducers);
