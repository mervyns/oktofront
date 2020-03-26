/* import - node_modules */
import { combineReducers } from "redux";
import userSliceReducer from "./modules/userSlice";

/* import - reducers */

const rootReducer = combineReducers({
  user: userSliceReducer
});

export default rootReducer;
