import { IObjectSchema } from './Schema';
import {
  IState,
  IImplementerState as IReducerImplementerState
} from './State.d';

/**
 * Parameters on the contructor.
 */
export interface IConstructorParameters<T> {
  /**
   * The name of this reducer/collection.
   */
  name: string;
  /**
   * The schema definition of the json documents this reducer manages in the collection.
   * See JSONSchema.org for details and examples on structuring a schema for JSON objects.
   */
  schema: IObjectSchema<T>;
}

/**
 * The type interface for a reducer's initial state.
 */
export interface IState<T> extends IState {
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
 * The implementer's state.
 * Essentially any object with at least an $id key.
 */
export interface IImplementerState extends IReducerImplementerState {
  $id: string;
}
