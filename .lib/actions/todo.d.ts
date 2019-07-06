export declare const ADD_TODO = "ADD_TODO";
export declare const TOGGLE_TODO = "TOGGLE_TODO";
export declare const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
export declare const VisibilityFilters: {
    SHOW_ALL: string;
    SHOW_COMPLETED: string;
    SHOW_ACTIVE: string;
};
export declare function addTodo(text: string): {
    type: string;
    text: string;
};
export declare function toggleTodo(index: number): {
    type: string;
    index: number;
};
export declare function setVisibilityFilter(filter: string): {
    type: string;
    filter: string;
};
