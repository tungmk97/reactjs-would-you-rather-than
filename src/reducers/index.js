import { combineReducers } from 'redux';
import userLogged from './userLogged';
import questions from '../reducers/questions';
import users from '../reducers/users';

export default combineReducers({
  userLogged,
  questions,
  users,
});
