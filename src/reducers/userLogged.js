export default function userLogged(state = null, action) {
  if (action.type === 'SET_USER_LOGGED') {
    return action.id;
  }
  return state;
}
