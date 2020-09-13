import callApi from "./common/callApi";
import { actionTypes } from "../constants/actionTypes";
import moment from 'moment';

export const getUserInfo = () => (dispatch, getState) => {
  return callApi('api/profile/get', { method: 'POST', data: { body: {} } })
    .then((obj) => {
      console.log('agsagsa',moment(obj.data.userProfile.birthday).format('YYYY-MM-DD'))
      if (obj && obj.data && obj.code === 200) {
        // dispatch({
        //   type: actionTypes.GET_USER_INFO,
        //   user: obj.data.userProfile || {},
        // });
        // obj.data.userProfile.birthday = moment(obj.data.userProfile.birthday).format('dd/MM/yyyy'); 
        // console.log("getUserInfo -> birthday", obj.data.userProfile.birthday)
        dispatch(receiveUserInfo(obj.data.userProfile || {}));
      }
    })
    .catch(err => {

    });
};

export const login = (username, password) => (dispatch, getState) => {
  return callApi('auth/token', { method: 'POST', data: { body: { username, password } } })
    .then(({ data, code, message }) => {
      console.log('abc',{ data, code, message })
      if (data && code === 200) {
        const accessToken = data.token;
        dispatch({
          type: actionTypes.RECEIVE_ACCESS_TOKEN,
          accessToken,
        });
        window.noti.success('Đăng nhập thành công');
        localStorage.setItem('accessToken', accessToken);
        // window.location.pathname = '/';
      }
      if (code === 400) {
        window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
      }
    })
    .catch(err => {
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
        window.noti.success('Đăng ký tài khoản thành công');
      }
      if (code === 400) {
        if (message === "Username Exists") return window.noti.error('Tài khoản này đã tồn tài, vui lòng nhập tài khoản khác');
        window.noti.error('Đăng ký tài khoản thất bại');
      }
    })
    .catch(err => {
      console.log("createAccount -> err=", err);
    });
};

export const changePassword = (username, newPassword, otp) => (dispatch, getState) => {
  const reqBody = {
    body: {
      userRegister: {
        username,
        newPassword,
        otp,
      }
    }
  }
  return callApi('change-password', { method: 'POST', data: reqBody })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        window.noti.success('Đổi mật khẩu thành công');
      }
      if (code === 400) {
        if (message === 'OTP Invalid') return window.noti.error('Đổi mật khẩu thất bại, mã OTP không đúng');
        window.noti.error('Đổi mật khẩu thất bại');
      }
    })
    .catch(err => {
      // window.noti.error('Đổi mật khẩu thất bại');
    });
};

export const getOtpCode = (username, type) => (dispatch, getState) => {
  const pathUrl = type === 'login' ? 'generate-otp' : 'forgot-password';
  const reqBody = {
    body: {
      userRegister: {
        username,
      }
    }
  }
  return callApi(pathUrl, { method: 'POST', data: reqBody })
    .then(({ data, code, message }) => {
      if (data && code === 200) {

      }
      if (code === 400) {

      }
    })
    .catch(err => {

    });
};

export const updateUserInfo = (name, phone, birthday, gender, school) => (dispatch, getState) => {
  const reqBody = {
    body: {
      userProfile: {
        fullname: name,
        phone,
        birthday,
        gender,
        school,
      }
    }
  }
  return callApi('api/profile/update', { method: 'POST', data: reqBody })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        console.log("updateUserInfo -> data", data)
        // data.userProfile.birthday = "abc";
        dispatch(receiveUserInfo(data.userProfile || {}));
      }
      if (code === 400) {
        window.noti.error('Cập nhật thông tin tài khoản thất bại')
      }
    })
    .catch(err => {
      console.log("createAccount -> err=", err);
    });
};

export const changeAvatar = (imgBase64, typeFile) => (dispatch, getState) => {
  const reqBody = {
    body: {
      imgBase64,
      fileTail: typeFile.split('/')[1],
    }
  }
  return callApi('api/profile/upload-img', { method: 'POST', data: reqBody })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch({
          type: actionTypes.UPDATE_AVATAR,
          avatar: imgBase64,
        });
        window.noti.success('Thay đổi ảnh đại diện thành công');
      }
      if (code === 400) {
        window.noti.success('Thay đổi ảnh đại diện thất bại');
      }
    })
    .catch(err => {

    });
};

export const getAvatar = () => (dispatch, getState) => {
  return callApi('api/profile/get-img', { method: 'GET' })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch({
          type: actionTypes.UPDATE_AVATAR,
          avatar: data.imgBase64,
        });
        // window.noti.success('Thay đổi ảnh đại diện thành công');
      }
      if (code === 400) {
        // window.noti.success('Thay đổi ảnh đại diện thất bại');
      }
    })
    .catch(err => {

    });
}





export const receiveUserInfo = (user) => ({
  type: actionTypes.GET_USER_INFO,
  user,
});