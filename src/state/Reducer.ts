import { IObjectSchema } from './Schema';
import { IState, IAction, TActionMethod } from './Reducer.d';

/**
 * Primary structure of a Reducer with Collection structure.
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
  private actions: { [key: string]: IAction<T, any> };

  /**
   * Readme documentation for this reducer.
   * This is typically only assigned if the application is in developer mode.
   */
  private doc: string;

  /**
   * Create a new reducer instance.
   * @param name The name of the state this reducer manages.
   * @param schema The schema definition of the state this reducer manages.
   */
  constructor(name: string, schema: IObjectSchema<T>) {
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
   * @param unique If the indexed key should be unique.
   */
  public index = (key: string, unique: boolean = false) => {
    this.state._indices[key] = {};
    if (unique) {
      this.state._uniques.push(key);
    }
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
      state = this.actions[type].method(state, action.payload);
    }

    return state;
  };

  /**
   * Creates a new action reducer.
   * @param type The type of action to listen on.
   */
  public action = <P>(
    type: string,
    description: string,
    schema: any,
    method: TActionMethod<T, P>,
    validator: any = () => true
  ): TActionMethod<T, P> => {
    const action = {
      type: `${this.name.toUpperCase()}/${type.toUpperCase()}`,
      description,
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
      _indices: {},
      _uniques: [],
      collection: []
    };
  }
}
