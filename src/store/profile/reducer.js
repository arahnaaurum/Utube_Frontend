import { SET_USER, SET_AUTHOR } from "./actions"

const initialState = {
    id: null,
    authorId: null,
  }
  
export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          id: action.payload
        }

        case SET_AUTHOR:
        return {
          ...state,
          authorId: action.payload
        }

        default:
          return state
    }

  }