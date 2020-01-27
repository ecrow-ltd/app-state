import { createStore, combineReducers } from 'redux';
import './reducers';
import Reducer from './Reducer';

export const reducers = combineReducers(Reducer.map());

export default createStore(reducers);
