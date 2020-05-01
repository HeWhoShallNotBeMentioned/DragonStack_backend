import { fetchFromAccount } from ',/account';
import { ACCOUNT_INFO } from './types';

export const fetchAccountInfo = () => fetchFromAccount({
  endpoint: 'login',
  options: {
    credentials: 'include'
  },
  FETCH_TYPE: ACCOUN_INFO.FETCH,
  ERROR_TYPE: ACCOUNT_INFO.FETCH_ERROR,
  SUCCESS_TYPE: ACCOUNT_INFO.FETCH_SUCCESS
});
