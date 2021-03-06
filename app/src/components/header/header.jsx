// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
/** @jsxRuntime classic */
import { css, jsx } from "@emotion/react";
import React from "react";

import { Link, useLocation, useHistory } from "react-router-dom";

const headerStyle = css`
  display: flex;
  justify-content: space-between;
`;

const linksStyle = css`
  display: flex;
`;

const linkStyle = css`
  cursor: pointer;
  margin-left: 20px;
`;

const Header = ({ history, username }) => (
  <header css={headerStyle}>
    <div>Hello, {username}</div>
    <div css={linksStyle}>
      <Link to="/pokemon">Home</Link>
      <div css={linkStyle} onClick={history.goBack}>
        Back
      </div>
    </div>
    <div>
      <Link to="/login">Logout</Link>
    </div>
  </header>
);

const withHeader =
  (Component) =>
  ({ authLogin, username, token }) => {
    const location = useLocation();
    const history = useHistory();

    if (!token) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        authLogin({
          username: localStorage.getItem("username"),
          token: storedToken,
        });
      }
    }

    return token ? (
      <>
        <Header username={username} history={history} />
        <Component />
      </>
    ) : (
      <div>
        Please{" "}
        <Link
          to={{
            pathname: "/login",
            state: { returnToPath: location.pathname },
          }}
        >
          Login
        </Link>{" "}
        to access this page
      </div>
    );
  };

export default withHeader;
