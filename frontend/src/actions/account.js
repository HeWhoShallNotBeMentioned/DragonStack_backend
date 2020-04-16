import { ACCOUNT } from './types';
import { BACKEND } from '../config';

const FetchFromAccount = ({ endpoint, options, SUCCESS_TYPE }) => async dispatch => {

  dispatch({ type: ACCOUNT.FETCH })
  try {
    let data = await (await fetch(`${BACKEND.ADDRESS}/account/${endpoint}`, options)).json();
    console.log("data ", data)
    if (data.type === 'error') {
      dispatch({
        type: ACCOUNT.FETCH_ERROR,
        message: data.message
      })
    } else {
      return dispatch({
        type: SUCCESS_TYPE,
        ...data,
      });
    }

  } catch (error) {
    dispatch({
      type: ACCOUNT.FETCH_ERROR,
      message: error.message
    })
  }

}

export const signup = ({ username, password }) => async (dispatch) => {
  // {

  //   FetchFromAccount(
  //     {
  //       endpoint: 'signup',
  //       options: {
  //         method: 'POST',
  //         body: JSON.stringify({ username, password }),
  //         headers: { 'Content-Type': 'application/json' },
  //         credentials: 'include'
  //       },
  //       SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS,
  //     }
  //   );
  // }
  dispatch({ type: ACCOUNT.FETCH })
  try {
    let data = await (await fetch(`${BACKEND.ADDRESS}/account/signup`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })).json();
    console.log("data ", data)
    if (data.type === 'error') {
      dispatch({
        type: ACCOUNT.FETCH_ERROR,
        message: data.message
      })
    } else {
      return dispatch({
        type: ACCOUNT.FETCH_SUCCESS,
        ...data,
      });
    }

  } catch (error) {
    dispatch({
      type: ACCOUNT.FETCH_ERROR,
      message: error.message
    })
  }
}

export const signout = () => {
  async (dispatch) => {
    dispatch({ type: ACCOUNT.FETCH });

    try {

      let data = await (await fetch(`${BACKEND.ADDRESS}/account/logout`,
        { credentials: include, })).json();

      if (data.type === 'error') {
        dispatch({
          type: ACCOUNT.FETCH_ERROR,
          message: data.message
        })
      } else {
        dispatch({ type: ACCOUNT.FETCH_LOGOUT_SUCCESS, ...data })
      }

    } catch (error) {
      dispatch({
        type: ACCOUNT.FETCH_ERROR,
        message: error.message
      })
    }
  }
}
