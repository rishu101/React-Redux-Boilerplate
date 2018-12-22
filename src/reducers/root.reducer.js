import { combineReducers } from "redux";
import simpleReducer from "./simple.reducer";

export default combineReducers({
  test: simpleReducer
});
