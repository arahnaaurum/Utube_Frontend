import { SET_CHATS } from "./actions"

const initialState = {
    listOfChats: []
}
  
export const publicChatReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CHATS:
        return {
          listOfChats: action.payload,
        }
        default:
          return state
    }

  }