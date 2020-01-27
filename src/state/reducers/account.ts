import Reducer from '../Reducer';

export interface Account {
  username: string;
  password: string;
  email: string;
}

const accountReducer = new Reducer<Account>('account');

/**
 * User Creation
 */
export const create = accountReducer.action<Account>(
  'CREATE',
  (state, payload) => {
    state.collection.push({ ...payload });

    return { ...state };
  }
);

export default accountReducer;
