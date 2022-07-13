import {_getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer} from './_DATA';

export async function initData() {
  const [users, questions] = await Promise.all([_getUsers(), _getQuestions()]);
  return {
    users,
    questions,
  };
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer(userLogged, qid, answer) {
  return _saveQuestionAnswer({ userLogged, qid, answer });
}
