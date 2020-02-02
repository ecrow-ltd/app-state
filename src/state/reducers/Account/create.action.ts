import Account, { IAccount } from './Account';
import { v4 as uuid } from 'uuid';

/**
 * The Create Interface
 */
export interface ICreate {
  username: string;
  email: string;
  password?: string;
}

/**
 * The Create Schema
 */
export const SCreate = {
  $schema: 'http://json-schema.org/schema#',
  $id: 'ACCOUNT/CREATE',
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['username', 'password']
};

/**
 * The Create Action
 */
export const create = Account.action<ICreate>(
  'CREATE',
  SCreate,
  (state, payload, context) => {
    const newAccount: IAccount = {
      $id: uuid(),
      username: payload.username,
      password: payload.password || null,
      email: payload.email
    };
    state.collection.push(newAccount);

    return { ...state };
  }
);
