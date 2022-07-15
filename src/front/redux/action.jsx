import { SET_MODE, SET_NAV_SHOW } from "./constant";

export const setMode = (data) => ({
  type: SET_MODE,
  data
});
export const setNavShow = (data) => ({
  type: SET_NAV_SHOW,
  data
});