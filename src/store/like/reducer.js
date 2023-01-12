import { SET_LIKES } from "./actions"

const initialState = {
  listOfLikes: []
}
  
export const likeReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_LIKES:
        return {
          ...state,
          listOfLikes: action.payload
        }

        default:
          return state
    }

  }