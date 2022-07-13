export default function users(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_USERS':
      return {
        ...state,
        ...action.users,
      };
    case 'ADD_ANSWER_TO_USER':
      const { userLogged, qid, answer } = action;

      return {
        ...state,
        [userLogged]: {
          ...state[userLogged],
          answers: {
            ...state[userLogged].answers,
            [qid]: answer,
          },
        },
      };
    case 'ADD_QUESTION_TO_USER':
      const { id, author } = action;

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id),
        },
      };
    default:
      return state;
  }
}
