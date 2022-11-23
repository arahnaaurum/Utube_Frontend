export const SET_USER = "SET_USER";
export const SET_AUTHOR = "SET_AUTHOR";

export const setUser = (value) => ({
  type: SET_USER,
  payload: value
})

export const setAuthor = (value) => ({
  type: SET_AUTHOR,
  payload: value
})