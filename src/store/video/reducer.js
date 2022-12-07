import { SET_VIDEO, FILTER_VIDEO, GET_SUB_VIDEO } from "./actions"

const initialState = {
    listOfVideos: [],
    listOfSubVideos: []
}
  
export const videoReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_VIDEO:
        return {
          ...state,
          listOfVideos: action.payload,
        }
      case FILTER_VIDEO:
        return {
          ...state,
          listOfVideos: action.payload,
        }
      case GET_SUB_VIDEO:
          return {
            ...state,
            listOfSubVideos: action.payload,
          }
        default:
          return state
    }

  }