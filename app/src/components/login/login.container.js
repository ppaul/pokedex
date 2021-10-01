import { connect } from "react-redux";

import { authLogin, authLogout } from "@Actions/auth-actions";

import LoginComponent from "./login";

const mapDispatchToProps = (dispatch) => ({
  authLogin: (payload) => dispatch(authLogin(payload)),
  authLogout: () => dispatch(authLogout()),
});

export default connect(null, mapDispatchToProps)(LoginComponent);
