import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/todo';
var SHOW_ALL = VisibilityFilters.SHOW_ALL;
function visibilityFilter(state, action) {
    if (state === void 0) { state = SHOW_ALL; }
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}
function todos(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case ADD_TODO:
            return state.concat([
                {
                    text: action.text,
                    completed: false
                }
            ]);
        case TOGGLE_TODO:
            return state.map(function (todo, index) {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    });
                }
                return todo;
            });
        default:
            return state;
    }
}
var todoApp = combineReducers({
    visibilityFilter: visibilityFilter,
    todos: todos
});
export default todoApp;
//# sourceMappingURL=todo.js.map