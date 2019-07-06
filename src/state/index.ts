import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import todoApp from './reducers/todo';

export default createStore(todoApp, devToolsEnhancer({
    name: 'Android app',
    maxAge: 30,
    actionsBlacklist: ['EFFECT_RESOLVED'],
    actionSanitizer: (action: any) => (
     action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
     { ...action, data: '<<LONG_BLOB>>' } : action
    ),
    stateSanitizer: (state: any) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
  }));