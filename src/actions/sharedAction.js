import { initData } from '../utils/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

export function handleInitialData() {
  return async (dispatch) => {
    const { users, questions } = await initData();
    dispatch(receiveQuestions(questions));
    dispatch(receiveUsers(users));
  };
}
