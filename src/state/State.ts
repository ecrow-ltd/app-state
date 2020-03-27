import { IObjectSchema } from './Schema';
import {
  IConstructorParameters,
  IState,
  IImplementerState,
  IAction,
  TActionMethod
} from './State.d';

class State<S extends IState, T extends IImplementerState> {
  /**
   * Static collection of all reducers.
   */
  private static reducers: State<any, any>[] = [];

  /**
   * Returns all instantiated reducer instances.
   */
  public static all = (): State<any, any>[] => {
    return State.reducers;
  };

  /**
   * Returns all instantiated reducer methods.
   */
  public static allMethods() {
    return State.reducers.map((reducer: State<any, any>) => {
      return reducer.method;
    });
  }

  /**
   * Returns all instantiated reducers mapped by their name.
   */
  public static map() {
    const map: { [key: string]: any } = {};
    const reducers = State.reducers;
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
    const reducers = State.reducers;
    for (let i = 0; i < reducers.length; i++) {
      const reducer = reducers[i];
      map[reducer.name.toLowerCase()] = reducer.method;
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
  protected schema: IObjectSchema<T>;

  /**
   * References to reducer functions for specific actions.
   */
  protected reducer: { [key: string]: IAction<S, any> };

  /**
   * Readme documentation for this reducer.
   * This is typically only assigned if the application is in developer mode.
   */
  protected doc: string;

  /**
   * Create a new reducer instance.
   */
  constructor(parameters: IConstructorParameters<S, T>) {
    State.reducers.push(this);
    this.name = parameters.initial._name;
    this.state = parameters.initial;
    this.schema = parameters.schema;
    this.reducer = {};
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
  public getReducers = () => this.reducer;

  /**
   * The actual reducer method.
   */
  public method = (state: S = this.state, action: any): S => {
    const type = action.type;
    if (this.reducer[type]) {
      state = this.reducer[type].method(state, action.payload);
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
    method: TActionMethod<S, P>,
    validator: any = () => true
  ): TActionMethod<S, P> => {
    const action = {
      type: `${this.name.toUpperCase()}/${type.toUpperCase()}`,
      description,
      schema,
      method,
      validator
    };
    this.reducer[action.type] = action;
    return action.method;
  };

  public documentation = (text: string) => {
    this.doc = text;
  };
}

export default State;
