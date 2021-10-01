import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Login = ({ authLogin, authLogout }) => {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onEmailChange = (event) => setEmail(event.target.value);

  const onPasswordChange = (event) => setPassword(event.target.value);

  const checkLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data?.success) {
      const { username, token } = data;
      authLogin({ username, token });
      const { state } = location;
      if (state?.returnToPath) {
        history.push(state.returnToPath);
      } else {
        history.push("/pokemon");
      }
    } else {
      setError(data.error);
    }
  };

  return (
    <div>
      <h6>Example login: test@test.com / test</h6>
      <div>Email</div>
      <input onChange={onEmailChange} value={email} placeholder="Email" />
      <div>Password</div>
      <input type="password" onChange={onPasswordChange} />
      <button type="button" onClick={checkLogin} disabled={!email || !password}>
        Login
      </button>
      <div>{error}</div>
    </div>
  );
};

export default Login;
