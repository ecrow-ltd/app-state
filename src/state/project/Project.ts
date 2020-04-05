import { IConstructor } from './Project.d';
import State from '../State';
/**
 * Class for a project.
 * A project is a suite of states. It provides a namespace for these states to prevent name clashes between reducer/action types.
 */
class Project {
  /**
   * The name of the project.
   */
  protected name: string;

  /**
   * The states assigned to this project.
   */
  protected states: State<any, any>[];

  constructor(params: IConstructor) {
    this.name = params.name;
    this.states = [];
  }

  /**
   * Creates a state.
   */
  public setStates = (states: State<any, any>[]) => {};
}
