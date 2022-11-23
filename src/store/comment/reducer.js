import { SET_COMMENTS } from "./actions"

const initialState = {
    listOfComments: []
}
  
export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_COMMENTS:
        return {
          listOfComments: action.payload,
        }
        default:
          return state
    }

  }