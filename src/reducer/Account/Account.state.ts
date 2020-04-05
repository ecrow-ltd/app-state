import Collection from '@state/Collection';
import { IObjectSchema } from '@state/Schema.d';

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
 * The JSON Schema definition for the sub-state.
 * This should match the typescript interface (which will be enforced if using typescript).
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
 * Instantiate the Account collection.
 */
const Account = new Collection<IAccount>({
  name: 'account',
  schema: schema
});

/**
 * Indexes
 */
Account.index('$id', true);
Account.index('email', true);
Account.index('alias');

Account.documentation(`
The account reducer maintains account information about a specific user.
`);

const actions = Account.getActions();

console.log(actions['CREATE']('SYSTEM', 'First action', {}));

export default Account;
