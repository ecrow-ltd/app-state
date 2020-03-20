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
  _indices: { [key: string]: { [key: string]: T } };
  /**
   * Array of keys that should be unique.
   */
  _uniques: string[];
  /**
   * The collection of referenced objects this reducer manages.
   */
  collection: T[];
}

/**
 * Type for a reducer function on an action.
 */
export type TActionMethod<T, P> = (state: IState<T>, payload: P) => IState<T>;

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
