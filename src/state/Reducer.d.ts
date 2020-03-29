import State from './State';

/**
 * Ab interface for defining the meta information and method for a reducer.
 * @template S The type for the state object passed into the reducer's method.
 * @template P The type for the payload object passed into the reducer's method.
 */
export interface IReducer<S, P> {
  /**
   * The string key that will trigger the reducer method.
   */
  type: string;

  /**
   * Description of the reducer.
   */
  description: string;

  /**
   * The JSON Schema object for the reducer function's payload.
   */
  schema: any;

  /**
   * The validator function for the reducer function payload
   * (compiled from the JSON Schema object).
   */
  validator: any;

  /**
   * The method for an action is essentially a piece of the reducer function.
   */
  method: TMethod<S, P>;
}

/**
 * Type for a reducer function on an action.
 * @template S The typing for the reducer's state.
 * @template P The typing for the payload.
 */
export interface IReducerThunk<S, P> {
  (context: State<S, any>): IReducer<S, P>;
}

/**
 * Type for a reducer function on an action.
 */
export type TMethod<S, P> = (state: S, payload: P) => S;
