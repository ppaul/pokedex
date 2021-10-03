import withHeader from "./header";
import { authLogin } from "@Actions/auth-actions";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const {
    auth: { username, token },
  } = state;

  return { username, token };
};

const mapDispatchToProps = (dispatch) => ({
  authLogin: (payload) => dispatch(authLogin(payload)),
});

const wrapper = (...args) =>
  connect(mapStateToProps, mapDispatchToProps)(withHeader(...args));

export default wrapper;
