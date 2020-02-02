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
  indexes: { [key: string]: { [key: string]: T } };
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
export type ActionMethod<T, P> = (
  state: IState<T>,
  payload: P,
  context: Reducer<T>
) => IState<T>;

/**
 * Type for a finalized action object.
 */
export interface Action<T, P> {
  type: string;
  schema: any;
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
  private actions: { [key: string]: Action<T, any> };

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
   * Creates on index on a key value of documents in the collection.
   * You can only index before the reducer is added to the store.
   * @param key The key to index on documents of this reducer's collection.
   */
  public index = (key: string) => {
    this.state.indexes[key] = {};
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
    method: ActionMethod<T, P>
  ): ActionMethod<T, P> => {
    const action = {
      type: `${this.name.toUpperCase()}/${type.toUpperCase()}`,
      schema,
      method
    };
    return action.method;
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
