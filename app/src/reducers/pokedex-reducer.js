import { POKEDEX_SAMPLE_ACTION } from "../actions/action-types";

const initialState = {};

const aReducerFunc = (state, { aField }) => {
  return { ...state, myVar: aField }; // todo, add more
};

const pokedexReducer = (state = initialState, action) => {
  switch (action.type) {
    case POKEDEX_SAMPLE_ACTION:
      return aReducerFunc(state, action);
    default:
      return state;
  }
};

export default pokedexReducer;
