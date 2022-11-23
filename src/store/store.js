import { combineReducers, createStore } from "redux";
import { profileReducer } from "./profile/reducer";
import { videoReducer } from "./video/reducer";
import { commentReducer } from "./comment/reducer";

const reducers = combineReducers ({
  profile: profileReducer,
  video: videoReducer,
  comment: commentReducer,
})

export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;