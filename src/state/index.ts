import { createStore, combineReducers } from 'redux';
import './reducers';
import Reducer from './Reducer';

export const reducers = combineReducers(Reducer.mapMethods());

export default createStore(reducers);
