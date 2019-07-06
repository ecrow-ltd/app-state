/*
 * action types
 */
export var ADD_TODO = 'ADD_TODO';
export var TOGGLE_TODO = 'TOGGLE_TODO';
export var SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
/*
 * other constants
 */
export var VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};
/*
 * action creators
 */
export function addTodo(text) {
    return { type: ADD_TODO, text: text };
}
export function toggleTodo(index) {
    return { type: TOGGLE_TODO, index: index };
}
export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter: filter };
}
//# sourceMappingURL=todo.js.map