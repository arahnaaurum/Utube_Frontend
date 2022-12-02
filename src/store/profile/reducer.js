import { SET_USER, SET_AUTHOR, IS_BANNED } from "./actions"

const initialState = {
    id: null,
    authorId: null,
    isBanned: false,
    profilePic: null,
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
          authorId: action.payload.id,
          profilePic: action.payload.picture
        }

        case IS_BANNED:
        return {
          ...state,
          isBanned: true,
        }

        default:
          return state
    }

  }