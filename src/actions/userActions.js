import callApi from "./common/callApi";
import { actionTypes } from "../constants/actionTypes";


export const getUserInfo = () => (dispatch, getState) => {
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

export const login = (username, password) => (dispatch, getState) => {
  return callApi('auth/token', { method: 'POST', data: { body: { username, password } } })
    .then(({ data, code, message }) => {
      console.log("createAccount -> data=", { data, code, message });
      if (data && code === 200) {
        const accessToken = data;
        localStorage.setItem('accessToken', accessToken);
        window.location.pathname = '/';
        dispatch({
          type: actionTypes.RECEIVE_ACCESS_TOKEN,
          accessToken,
        })
      }
      if (data && code === 400) {
        window.noti.error('Tài khoản hoặc mật khẩu không đúng')
      }
    })
    .catch(err => {
      console.log("createAccount -> err=", err);
    });
};

export const logout = () => (dispatch, getState) => {
  const accessToken = '';
  localStorage.setItem('accessToken', accessToken);
  dispatch({
    type: actionTypes.RECEIVE_ACCESS_TOKEN,
    accessToken,
  })
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
    .then(({ data, code, message }) => {
      console.log("createAccount -> data=", { data, code, message });
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