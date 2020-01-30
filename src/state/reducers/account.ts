import Reducer from '../Reducer';

export interface Account {
  $id: string;
  username: string;
  password: string;
  email: string;
}

const accountReducer = new Reducer<Account>('account');

/**
 * Indexes
 */
accountReducer.index('$id');
accountReducer.index('username');

/**
 * Account Creation
 */
export const create = accountReducer.action<Account>(
  'CREATE',
  (state, payload, context) => {
    state.collection.push({ ...payload });

    return { ...state };
  }
);

export default accountReducer;
