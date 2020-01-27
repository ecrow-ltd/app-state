/**
 * The type interface for a reducer's initial state.
 */
export interface IState<T> {
  /**
   * The name of the state.
   */
  name: string;
  /**
   * Indexes to objects in the collection.
   */
  indexes: Object;
  /**
   * A reference of the object that the application is currently focused on.
   */
  focused: T | null;
  /**
   * References to objects that the application considers selected.
   */
  selected: T[];
  /**
   * The collection of referenced objects this reducer manages.
   */
  collection: T[];
}

/**
 * Type for a reducer function on an action.
 */
export type ActionReducer<T, P> = (state: IState<T>, payload: P) => IState<T>;

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
   * Returns all instantiated reducer methods in an key: value map.
   * The map is the name of the reducer (key) with the reducer method (value).
   * name: method;
   */
  public static map() {
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
  private actions: { [key: string]: ActionReducer<T, any> };

  /**
   * Create a new reducer instance.
   * @param name The name of the reducer
   */
  constructor(name: string) {
    Reducer.reducers.push(this);
    this.name = name;
    this.state = this.createState(name);
    this.actions = {};
  }

  /**
   * The actual reducer method.
   */
  public method = (state: IState<T> = this.state, action: any): IState<T> => {
    const type = action.type;
    if (this.actions[type]) {
      return this.actions[type](state, action.payload);
    }

    return state;
  };

  /**
   * Creates a new action reducer.
   * @param type The type of action to listen on.
   */
  public action = <P>(
    type: string,
    reducer: ActionReducer<T, P>
  ): ActionReducer<T, P> => {
    return (this.actions[
      `${this.name.toUpperCase()}/${type.toUpperCase()}`
    ] = reducer);
  };

  /**
   * Generates the initial state of the reducer.
   */
  private createState(name: string): IState<T> {
    return {
      name,
      indexes: {},
      focused: null,
      selected: [],
      collection: []
    };
  }
}
