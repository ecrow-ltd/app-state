import Reducer from '../../Reducer';
import PropTypes from 'prop-types';

export interface IAccount {
  $id: string;
  username: string;
  password: string | null;
  email: string;
}

const Account = new Reducer<IAccount>('account');

const types = {
  username: {
    type: 'string'
  }
};

/**
 * Indexes
 */
Account.index('$id');
Account.index('username');

Account.documentation(`
The account reducer maintains account information about a specific user.
`);

export default Account;
