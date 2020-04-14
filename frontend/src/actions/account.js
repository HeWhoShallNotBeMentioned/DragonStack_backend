import { ACCOUNT } from './types';
import { BACKEND } from '../config';

export const signup = ({ username, password }) => async dispatch => {
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

};
