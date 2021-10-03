import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonList from "./components/pokemon-list";
import Pokemon from "./components/pokemon";
import Login from "./components/login";
import reduxStore from "./store";
import { Provider } from "react-redux";

const Routing = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={PokemonList} />
      <Route exact path="/pokemon" component={PokemonList} />
      <Route exact path="/pokemon/:id" component={Pokemon} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </Router>
);

const token = localStorage.getItem("token");
if (token) {
  reduxStore.auth = { token, username: localStorage.getItem("username") };
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <Routing />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
