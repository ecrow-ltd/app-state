import Reducer from '../../Reducer';
import { IObjectSchema } from '../../Schema.d';

/**
 * The TypeScript interface for the sub-state.
 */
export interface IAccount {
  /**
   * Unique identifier.
   */
  $id: string;
  /**
   * Public alias for the account.
   */
  alias: string;
  /**
   * The hashed password for the account. Zero length for clients.
   */
  password: string;
  /**
   * The email address connected to the account.
   */
  email: string;
  /**
   * The phone number connected to the account.
   */
  phone: string;
  /**
   * If the user is online or not.
   */
  online: boolean;
  /**
   * ID Reference to a person object.
   */
  referencePerson: string;
}

/**
 * The Create Schema
 */
export const schema: IObjectSchema<IAccount> = {
  $schema: 'http://json-schema.org/schema#',
  $id: 'ACCOUNT/CREATE',
  type: 'object',
  properties: {
    $id: {
      type: 'string',
      description: 'Unique identifier. Automatically generated.',
      default: ''
    },
    alias: {
      type: 'string',
      description: 'Public alias for the account.',
      default: ''
    },
    email: {
      type: 'string',
      description: 'The email address connected to the account.',
      default: ''
    },
    phone: {
      type: 'string',
      description: 'The phone number connected to the account.',
      default: ''
    },
    online: {
      type: 'boolean',
      description: 'If the user is online or not.',
      default: false
    },
    password: {
      type: 'string',
      description:
        'The hashed password for the account. Zero length for clients.',
      default: ''
    },
    referencePerson: {
      type: 'string',
      description: 'ID Reference to a person object.',
      default: ''
    }
  },
  required: ['alias', 'email', 'password']
};

/**
 * The JSON Schema definition for the sub-state.
 * This should match the typescript interface.
 */

const Account = new Reducer<IAccount>('account', schema);

/**
 * Indexes
 */
Account.index('$id', true);
Account.index('email', true);
Account.index('alias');

Account.documentation(`
The account reducer maintains account information about a specific user.
`);

export default Account;
