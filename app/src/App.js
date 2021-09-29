import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

const App = (props) => (
    <Provider store={store}>
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {props.children}
            </header>
        </div>
    </Provider>
);

export default App;
