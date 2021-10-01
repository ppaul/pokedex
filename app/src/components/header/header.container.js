import withHeader from "./header";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const {
    auth: { username, token },
  } = state;

  return { username, token };
};

const wrapper = (...args) => connect(mapStateToProps)(withHeader(...args));

export default wrapper;
