import { ACCOUNT } from './types';
import { BACKEND } from '../config';

export const fetchFromAccount = ({
  endpoint,
  options,
  FETCH_TYPE,
  ERROR_TYPE,
  SUCCESS_TYPE
}) => dispatch => {
  dispatch({ type: FETCH_TYPE });

  return fetch(`${BACKEND.ADDRESS}/account/${endpoint}`, options)
    .then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({ type: ERROR_TYPE, message: json.message });
      } else {
        dispatch({ type: SUCCESS_TYPE, ...json });
      }
    })
    .catch(error => dispatch({
      type: ERROR_TYPE, message: error.message
    }));
}

export const signup = ({ username, password }) => fetchFromAccount({
  endpoint: 'signup',
  options: {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  },
  FETCH_TYPE: ACCOUNT.FETCH,
  ERROR_TYPE: ACCOUNT.FETCH_ERROR,
  SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS
});

export const login = ({ username, password }) => fetchFromAccount({
  endpoint: 'login',
  options: {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  },
  FETCH_TYPE: ACCOUNT.FETCH,
  ERROR_TYPE: ACCOUNT.FETCH_ERROR,
  SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS
});

export const logout = () => fetchFromAccount({
  endpoint: 'logout',
  options: { credentials: 'include' },
  FETCH_TYPE: ACCOUNT.FETCH,
  ERROR_TYPE: ACCOUNT.FETCH_ERROR,
  SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS
});




// export const signup = ({ username, password }) => async (dispatch) => {
//   dispatch({ type: ACCOUNT.FETCH })
//   try {
//     let data = await (await fetch(`${BACKEND.ADDRESS}/account/signup`, {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include'
//     })).json();
//     console.log("data ", data)
//     if (data.type === 'error') {
//       dispatch({
//         type: ACCOUNT.FETCH_ERROR,
//         message: data.message
//       })
//     } else {
//       dispatch({
//         type: ACCOUNT.FETCH_SUCCESS,
//         ...data,
//       });
//     }

//   } catch (error) {
//     dispatch({
//       type: ACCOUNT.FETCH_ERROR,
//       message: error.message
//     })
//   }
// }

// export const login = ({ username, password }) => async (dispatch) => {
//   dispatch({ type: ACCOUNT.FETCH })
//   try {
//     let data = await (await fetch(`${BACKEND.ADDRESS}/account/login`, {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include'
//     })).json();
//     console.log("data ", data)
//     if (data.type === 'error') {
//       dispatch({
//         type: ACCOUNT.FETCH_ERROR,
//         message: data.message
//       })
//     } else {
//       dispatch({
//         type: ACCOUNT.FETCH_SUCCESS,
//         ...data,
//       });
//     }

//   } catch (error) {
//     dispatch({
//       type: ACCOUNT.FETCH_ERROR,
//       message: error.message
//     })
//   }
// }

// export const logout = () => async (dispatch) => {
//   dispatch({ type: ACCOUNT.FETCH });

//   try {

//     let data = await (await fetch(`${BACKEND.ADDRESS}/account/logout`,
//       { credentials: 'include', })).json();

//     if (data.type === 'error') {
//       dispatch({
//         type: ACCOUNT.FETCH_ERROR,
//         message: data.message
//       })
//     } else {
//       dispatch({ type: ACCOUNT.FETCH_LOGOUT_SUCCESS, ...data })
//     }

//   } catch (error) {
//     dispatch({
//       type: ACCOUNT.FETCH_ERROR,
//       message: error.message
//     })
//   }
// }

