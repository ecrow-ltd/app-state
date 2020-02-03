/**
 * The type interface for a reducer's initial state.
 */
export interface IState<T> {
  /**
   * The name of the state.
   */
  _name: string;
  /**
   * Indexes to objects in the collection.
   */
  _indexes: { [key: string]: { [key: string]: T } };
  /**
   * A reference of the object that the application is currently focused on.
   */
  _focused: T | null;
  /**
   * References to objects that the application considers selected.
   */
  _selected: T[];
  /**
   * The collection of referenced objects this reducer manages.
   */
  collection: T[];
}

/**
 * Type for a reducer function on an action.
 */
export type ActionMethod<T, P> = (
  state: IState<T>,
  payload: P,
  context: Reducer<T>
) => IState<T>;

/**
 * Interface for actions on a reducer.
 */
export interface Action<T, P> {
  /**
   * The string key that will trigger this action.
   * This also allows action for triggers on other reducers.
   */
  type: string;

  /**
   * The JSON Schema object for the action's payload.
   */
  schema: any;

  /**
   * The validator function (compiled frm the JSON Schema object).
   */
  validator: any;

  /**
   * The method for an action is essentially a piece of the reducer function.
   */
  method: ActionMethod<T, P>;
}

/**
 * Primary structure of a Reducer.
 * The reducer requires a type to validate insertions of information.
 */
export default class Reducer<T> {
  /**
   * Static collection of all reducers.
   */
  private static reducers: Reducer<any>[] = [];

  /**
   * Returns all instantiated reducer instances.
   */
  public static all() {
    return Reducer.reducers;
  }

  /**
   * Returns all instantiated reducer methods.
   */
  public static allMethods() {
    return Reducer.reducers.map((reducer: Reducer<any>) => {
      return reducer.method;
    });
  }

  /**
   * Returns all instantiated reducers mapped by their name.
   */
  public static map() {
    const map: { [key: string]: any } = {};
    const reducers = Reducer.reducers;
    for (let i = 0; i < reducers.length; i++) {
      const reducer = reducers[i];
      map[reducer.name.toLowerCase()] = reducer;
    }
    return map;
  }

  /**
   * Returns all instantiated reducer methods in an key: value map.
   * The map is the name of the reducer (key) with the reducer method (value).
   * name: method;
   */
  public static mapMethods() {
    const map: { [key: string]: any } = {};
    const reducers = Reducer.reducers;
    for (let i = 0; i < reducers.length; i++) {
      const reducer = reducers[i];
      map[reducer.name.toLowerCase()] = reducer.method;
    }
    return map;
  }

  /**
   * Name of this reducer
   */
  private name: string;

  /**
   * The initial state of the reducer.
   */
  private state: IState<T>;

  /**
   * References to action reducer functions.
   */
  private actions: { [key: string]: Action<T, any> };

  /**
   * Readme documentation for this reducer.
   * This is typically only assigned if the application is in developer mode.
   */
  private doc: string;

  /**
   * Create a new reducer instance.
   * @param name The name of the reducer
   */
  constructor(name: string) {
    Reducer.reducers.push(this);
    this.name = name;
    this.state = this.createState(name);
    this.actions = {};
    this.doc = '';
  }

  /**
   * Creates on index on a key value of documents in the collection.
   * You can only index before the reducer is added to the store.
   * @param key The key to index on documents of this reducer's collection.
   */
  public index = (key: string) => {
    this.state._indexes[key] = {};
  };

  /**
   * Gets the name of the reducer.
   */
  public getName = () => this.name;

  /**
   * Gets the name of the reducer.
   */
  public getState = () => this.state;

  /**
   * Gets the actions on this reducer.
   */
  public getActions = () => this.actions;

  /**
   * The actual reducer method.
   */
  public method = (state: IState<T> = this.state, action: any): IState<T> => {
    const type = action.type;
    if (this.actions[type]) {
      state = this.actions[type].method(state, action.payload, this);
    }

    return state;
  };

  /**
   * Creates a new action reducer.
   * @param type The type of action to listen on.
   */
  public action = <P>(
    type: string,
    schema: any,
    method: ActionMethod<T, P>,
    validator: any = () => true
  ): ActionMethod<T, P> => {
    const action = {
      type: `${this.name.toUpperCase()}/${type.toUpperCase()}`,
      schema,
      method,
      validator
    };
    this.actions[action.type] = action;
    return action.method;
  };

  public documentation = (text: string) => {
    this.doc = text;
  };

  /**
   * Generates the initial state of the reducer.
   */
  private createState(name: string): IState<T> {
    return {
      _name: name,
      _indexes: {},
      _focused: null,
      _selected: [],
      collection: []
    };
  }
}
