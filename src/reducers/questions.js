export default function questions(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_QUESTIONS':
      return {
        ...state,
        ...action.questions,
      };

    case 'ADD_QUESTION':
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };

    case 'ADD_ANSWER':
      const { userLogged, qid, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(userLogged),
          },
        },
      };

    default:
      return state;
  }
}
