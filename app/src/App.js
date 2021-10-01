import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

const App = (props) => (
  <Provider store={store}>
    <div className="App">{props.children}</div>
  </Provider>
);

export default App;
