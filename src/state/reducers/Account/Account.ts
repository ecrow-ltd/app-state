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

export default Account;
