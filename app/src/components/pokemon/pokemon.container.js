import Pokemon from "./pokemon";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const {
    authReducer: { username, token },
  } = state;

  return { username, token };
};

export default connect(mapStateToProps)(Pokemon);
