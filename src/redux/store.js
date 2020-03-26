// import thunk from "redux-thunk";
// import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

/* import - rootReducer */
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer
});

export default store;
