import {
  IConstructorParameters,
  IState,
  IImplementerState
} from './Collection.d';
import State from './State';

/**
 * Primary structure of a Collection with Collection structure.
 * The reducer requires a type to validate insertions of information.
 */
export default class Collection<T extends IImplementerState> extends State<
  IState<T>,
  T
> {
  /**
   * Create a new reducer instance.
   */
  constructor(parameters: IConstructorParameters<T>) {
    super({
      initial: {
        _name: parameters.name,
        _indices: {},
        _uniques: [],
        collection: []
      },
      schema: parameters.schema
    });
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
}
