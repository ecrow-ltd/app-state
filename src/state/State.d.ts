import { IObjectSchema } from './Schema';

/**
 * Parameters on the contructor.
 */
export interface IConstructorParameters<S, T> {
  /**
   * The initial object state of the reducer.
   */
  initial: S;
  /**
   * The schema definition of the json document this reducer manages.
   * See JSONSchema.org for details and examples on structuring a schema for JSON objects.
   */
  schema: IObjectSchema<T>;
}

/**
 * The type interface for a base reducer's initial state.
 * A base reducer's state can be anything.
 */
export interface IState {
  _name: string;
  [x: string]: any;
}

/**
 * The implementer's state.
 * Essentially any object.
 */
export interface IImplementerState {
  [x: string]: any;
}

/**
 * Type for a reducer function on an action.
 */
export type TActionMethod<T, P> = (state: T, payload: P) => T;

/**
 * Interface for actions on a reducer.
 */
export interface IAction<T, P> {
  /**
   * The string key that will trigger this action.
   * This also allows action for triggers on other reducers.
   */
  type: string;

  /**
   * Description of the action.
   */
  description: string;

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
  method: TActionMethod<T, P>;
}
