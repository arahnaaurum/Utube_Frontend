export const SET_USER = "SET_USER";
export const SET_AUTHOR = "SET_AUTHOR";
export const IS_BANNED = "IS_BANNED";


export const setUser = (value) => ({
  type: SET_USER,
  payload: value
})

export const setAuthor = (value) => ({
  type: SET_AUTHOR,
  payload: value
})

export const setIsBanned = () => ({
  type: IS_BANNED,
})