import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import pokedexReducer from "./pokedex-reducer";

export default combineReducers({
  authReducer,
  pokedexReducer
});
