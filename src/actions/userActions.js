import callApi from "./common/callApi";
import { actionTypes } from "../constants/actionTypes";


export const getUserInfo = () => async (dispatch, getState) => {
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

export const createAccount = (name, username, password1, email) => (dispatch, getState) => {
  const reqBody = {
    body: {
      userRegister: {
        username,
        fullname: name,
        password: password1,
        email,
        phone: '0967362612',
      }
    }
  }
  return callApi('register', { method: 'POST', data: reqBody })
    .then(({data, code, message}) => {
      console.log("createAccount -> data=", {data, code, message});
      if (data && code === 200) {

      }
      if (data && code === 400 && message === "Username Exists") {
        window.noti.error('Tài khoản này đã tồn tài, vui lòng nhập tài khoản khác')
      }
    })
    .catch(err => {
      console.log("createAccount -> err=", err);
    });
};













export const receiveUserInfo = (user) => ({
  type: actionTypes.GET_USER_INFO,
  user,
});