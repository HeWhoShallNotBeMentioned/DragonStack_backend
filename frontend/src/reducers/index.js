import { combineReducers } from 'redux';
import generation from './generation';
import dragon from './dragon';
import account from './account';
import accountDragons from './accountDragons';

export default combineReducers({ generation, dragon, account, accountDragons });
