import { IObjectSchema } from './Schema';
import { IConstructor, IState, IImplementerState } from './State.d';

import { IReducer, IReducerThunk } from './Reducer.d';

class State<S extends IState, I extends IImplementerState> {
  /**
   * Static collection of all State instances.
   */
  private static instances: State<any, any>[] = [];

  /**
   * Returns all instantiated reducer instances.
   */
  public static all = (): State<any, any>[] => {
    return State.instances;
  };

  /**
   * Returns all instantiated reducer methods.
   */
  public static allMethods() {
    return State.instances.map((instance: State<any, any>) => {
      return instance.method;
    });
  }

  /**
   * Returns all instantiated reducers mapped by their name.
   */
  public static map() {
    const map: { [key: string]: any } = {};
    const instances = State.instances;
    for (let i = 0; i < instances.length; i++) {
      const instance = instances[i];
      map[instance.name.toLowerCase()] = instance;
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
    const instances = State.instances;
    for (let i = 0; i < instances.length; i++) {
      const instance = instances[i];
      map[instance.name.toLowerCase()] = instance.method;
    }
    return map;
  }

  /**
   * Name of this reducer
   */
  protected name: string;

  /**
   * The initial state of the reducer.
   */
  protected state: S;

  /**
   * The schema for the state of the reducer.
   */
  protected schema: IObjectSchema<I>;

  /**
   * References to reducer functions for specific actions.
   */
  protected reducers: { [key: string]: IReducer<S, any> };

  /**
   * Readme documentation for this reducer.
   * This is typically only assigned if the application is in developer mode.
   */
  protected doc: string;

  /**
   * Create a new reducer instance.
   */
  constructor(params: IConstructor<S, I>) {
    State.instances.push(this);
    this.name = params.initial._name;
    this.state = params.initial;
    this.schema = params.schema;
    this.reducers = {};
    this.doc = '';
  }

  /**
   * Gets the name of this state.
   */
  public getName = () => this.name;

  /**
   * Get's the state's object.
   */
  public getState = () => this.state;

  /**
   * Gets the reducers on this state.
   */
  public getReducers = () => this.reducers;

  /**
   * Gets the schema on this state.
   */
  public getSchema = () => this.schema;

  /**
   * Gets the validator on this state.
   */
  public getValidator = () => null;

  /**
   * The actual reducer method.
   */
  public method = (state: S = this.state, action: any): S => {
    const type = action.type;
    if (this.reducers[type]) {
      state = this.reducers[type].method(state, action.payload);
    }

    return state;
  };

  /**
   * Creates a new action reducer.
   * @template P The typing for the payload of this reducer.
   * @param reducer Instance of a Reducer class.
   */
  public reducer = <P>(reducerThunk: IReducerThunk<S, P>): IReducer<S, P> => {
    const reducer = reducerThunk(this);
    reducer.type = `${this.name.toUpperCase()}/${reducer.type.toUpperCase()}`;
    this.reducers[reducer.type] = reducer;
    return reducer;
  };

  public documentation = (text: string) => {
    this.doc = text;
  };
}

export default State;
