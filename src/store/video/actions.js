export const SET_VIDEO = "SET_VIDEO";
export const FILTER_VIDEO = "FILTER_VIDEO";
export const GET_SUB_VIDEO = "GET_SUB_VIDEO";

export const setVideo = (value) => ({
  type: SET_VIDEO,
  payload: value
});

export const filterVideo = (value) => ({
  type: FILTER_VIDEO,
  payload: value
});

export const getSubVideo = (value) => ({
  type: GET_SUB_VIDEO,
  payload: value
});