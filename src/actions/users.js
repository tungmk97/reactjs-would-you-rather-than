import { saveQuestionAnswer } from '../utils/api';
import { addAnswer } from '../actions/questions';

export function receiveUsers(users) {
  return {
    type: 'RECEIVE_USERS',
    users: users,
  };
}

export function addAnswerToUser(userLogged, qid, answer) {
  return {
    type: 'ADD_ANSWER_TO_USER',
    userLogged: userLogged,
    qid: qid,
    answer: answer,
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: 'ADD_QUESTION_TO_USER',
    id: id,
    author: author,
  };
}

export function handleSaveQuestionAnswer(userLogged, qid, answer) {
  return async (dispatch) => {
    dispatch(addAnswerToUser(userLogged, qid, answer));
    dispatch(addAnswer(userLogged, qid, answer));

    try {
      return await saveQuestionAnswer(userLogged, qid, answer);
    } catch (e) {
      console.error('Error: ', e);
    }
  };
}
