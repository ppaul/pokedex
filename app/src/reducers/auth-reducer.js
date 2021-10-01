/**
 * Great resource here: https://www.bezkoder.com/react-hooks-redux-login-registration-example/
 */
import { AUTH_LOGIN, AUTH_LOGOUT } from "../actions/action-types";

const initialState = {};

const login = (state, { username, token }) => {
  return { ...state, username, token };
};

const logout = (state) => {
  return { ...state, username: undefined, token: undefined };
};

const pokedexReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return login(state, action.payload);
    case AUTH_LOGOUT:
      return logout(state, action.payload);
    default:
      return state;
  }
};

export default pokedexReducer;
