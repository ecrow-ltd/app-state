var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import todoApp from './reducers/todo';
export default createStore(todoApp, devToolsEnhancer({
    name: 'Android app',
    maxAge: 30,
    actionsBlacklist: ['EFFECT_RESOLVED'],
    actionSanitizer: function (action) { return (action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ? __assign({}, action, { data: '<<LONG_BLOB>>' }) : action); },
    stateSanitizer: function (state) { return state.data ? __assign({}, state, { data: '<<LONG_BLOB>>' }) : state; }
}));
//# sourceMappingURL=index.js.map