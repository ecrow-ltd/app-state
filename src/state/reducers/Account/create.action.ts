import Account, { schema, IAccount } from './Account';
import { v4 as uuid } from 'uuid';

/**
 * Action's description.
 */
const description = `
This action is used to create a new account on the state.
`;

/**
 * The Create Action
 */
export const create = Account.action<IAccount>(
  'CREATE',
  description,
  schema,
  (state, payload) => {
    const newAccount: IAccount = { ...payload };
    state.collection.push(newAccount);

    return { ...state };
  }
);
