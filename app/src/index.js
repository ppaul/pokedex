import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import PokemonList from "./components/pokemon-list";
import Pokemon from "./components/pokemon";

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={PokemonList} />
                <Route exact path="/pokemon" component={PokemonList} />
                <Route exact path="/pokemon/:id" component={Pokemon} />
            </Switch>
        </Router>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App>
            <Routing />
        </App>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
