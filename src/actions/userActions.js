import callApi from "./common/callApi";
import { actionTypes } from "../constants/actionTypes";


export const getUserInfo = () => (dispatch, getState) => {
  const state = getState();

  return callApi('api/profile/get-profile', { method: 'GET' })
    .then((json) => {
      dispatch({
        type: actionTypes.GET_USER_INFO,
        json,
      });
      // dispatch(receiveUserInfo(json));
    })
    .catch(err => {

    });
};


export const receiveUserInfo = (user) => ({
  type: actionTypes.GET_USER_INFO,
  user,
});