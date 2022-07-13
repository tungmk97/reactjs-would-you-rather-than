import { saveQuestion } from '../utils/api';
import { addQuestionToUser } from '../actions/users';

export function receiveQuestions(questions) {
  return {
    type: 'RECEIVE_QUESTIONS',
    questions: questions,
  };
}

export function addQuestion(question) {
  return {
    type: 'ADD_QUESTION',
    question: question,
  };
}

export function addAnswer(userLogged, qid, answer) {
  return {
    type: 'ADD_ANSWER',
    userLogged: userLogged,
    qid: qid,
    answer: answer,
  };
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return async (dispatch) => {
    const question_1 = await saveQuestion({ optionOneText, optionTwoText, author });
    dispatch(addQuestion(question_1));
    dispatch(addQuestionToUser(question_1));
  };
}
