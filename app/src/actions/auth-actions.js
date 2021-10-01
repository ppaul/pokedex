import { AUTH_LOGIN, AUTH_LOGOUT } from "./action-types";

const authLogin = (payload) => ({
  type: AUTH_LOGIN,
  payload,
});

const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export { authLogin, authLogout };
