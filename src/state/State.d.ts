import { IObjectSchema } from './Schema';

/**
 * Parameters on the constructor.
 */
export interface IConstructor<S, T> {
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
 * Essentially any object that will extend IState.
 */
export interface IImplementerState {
  [x: string]: any;
}
