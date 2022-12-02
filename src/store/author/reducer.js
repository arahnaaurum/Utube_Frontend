import { SET_AUTHORS } from "./actions"

const initialState = {
  listOfAuthors: []
}
  
export const authorReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_AUTHORS:
        return {
          ...state,
          listOfAuthors: action.payload
        }

        default:
          return state
    }

  }