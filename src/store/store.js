import { combineReducers, createStore } from "redux";
import { profileReducer } from "./profile/reducer";
import { videoReducer } from "./video/reducer";
import { commentReducer } from "./comment/reducer";
import { likeReducer } from "./like/reducer";
import { authorReducer } from "./author/reducer";
import { publicChatReducer } from "./publicchat/reducer";

const reducers = combineReducers ({
  profile: profileReducer,
  video: videoReducer,
  comment: commentReducer,
  like: likeReducer,
  author: authorReducer,
  public: publicChatReducer,
})

export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;