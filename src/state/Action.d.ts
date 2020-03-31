/**
 * An interface for defining the object for an action.
 * @template P The payload for the action.
 */
export interface IAction<P> {
  /**
   * The string key for the specific reducer to trigger when this action is committed.
   */
  type: string;

  /**
   * This action is being commit by a specific key (usually the name or id of a user).
   */
  by: string;

  /**
   * The action's commit message stating why this action is being submitted.
   */
  message: string;

  /**
   * The method for an action is essentially a piece of the reducer function.
   */
  payload: P;
}

/**
 * An interface for defining an action's method.
 * @template P The payload for the action.
 */
export type TActionMethod<P> = (
  by: string,
  message: string,
  payload: P
) => IAction<P>;
