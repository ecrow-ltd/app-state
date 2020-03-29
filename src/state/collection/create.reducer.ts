import { TCollectionReducer } from '../Collection.d';

/**
 * The Create Reducer
 */
const reducer: TCollectionReducer<any> = context => ({
  type: 'CREATE',
  description: `
  This reducer will add a new entry to collection of this state.
  `,
  schema: context.getSchema(),
  validator: context.getValidator(),
  method: (state, payload) => {
    const newEntry = { ...payload };
    state.collection.push(newEntry);

    return { ...state };
  }
});

export default reducer;
