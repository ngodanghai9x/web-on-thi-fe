import callApi from "./common/callApi";
import { actionTypes } from "../constants/actionTypes";
import { getCookie, setCookie } from "./common/utils";


export const getUserInfo = () => (dispatch, getState) => {
  return callApi('api/profile/get', { method: 'POST', data: { body: {} } })
    .then((obj) => {
      if (obj && obj.data && obj.code === 200) {
        // dispatch({
        //   type: actionTypes.GET_USER_INFO,
        //   user: obj.data.userProfile || {},
        // });
        dispatch(receiveUserInfo(obj.data.userProfile || {}));
      }
    })
    .catch(err => {

    });
};

export const login = (username, password) => (dispatch, getState) => {
  return callApi('auth/token', { method: 'POST', data: { body: { username, password } } })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        const accessToken = data.token;
        // const obj = JSON.parse(atob(accessToken.split('.')[1]));
        // dispatch({
        //   type: actionTypes.RECEIVE_ACCESS_TOKEN,
        //   accessToken,
        //   role: obj.ROLE,
        // });
        localStorage.setItem('accessToken', accessToken);
        setCookie('_accessToken', accessToken, 5);
        dispatch(init())
        window.noti.success('Đăng nhập thành công');
        window.location.pathname = '/';
      }
      if (code === 400) {
        window.noti.error('Tài khoản hoặc mật khẩu không đúng');
      }
    })
    .catch(err => {
    });
};

export const logout = () => (dispatch, getState) => {
  const accessToken = '';
  localStorage.removeItem('accessToken');
  setCookie('_accessToken', '', 1);
  dispatch({
    type: 'LOG_OUT',
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
      if (data && code === 200) {
        window.noti.success('Đăng ký tài khoản thành công');
        window.location.pathname = '/dang-nhap';
      }
      if (code === 400) {
        if (message === "Username Exists") return window.noti.error('Tài khoản này đã tồn tài, vui lòng nhập tài khoản khác');
        if (message === "Email Exists") return window.noti.error('Email này đã tồn tài, vui lòng nhập email khác');
        window.noti.error('Đăng ký tài khoản thất bại');
      }
    })
    .catch(err => {
      console.log("createAccount -> err=", err);
    });
};

export const changePassword = (username, newPassword, oldPassword) => (dispatch, getState) => {
  const reqBody = {
    body: {
      newPassword,
      oldPassword,
    }
  }
  return callApi('api/profile/change-password', { method: 'POST', data: reqBody })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        window.noti.success('Đổi mật khẩu thành công');
        dispatch(callApiUser());
      }
      if (code === 400) {
        // if (message === 'OTP Invalid') return window.noti.error('Đổi mật khẩu thất bại, mã OTP không đúng');
        window.noti.error('Đổi mật khẩu thất bại');
      }
    })
    .catch(err => {
      // window.noti.error('Đổi mật khẩu thất bại');
    });
};

export const changeForgotPassword = (username, email, newPassword, otp, selected) => (dispatch, getState) => {
  const temp = { newPassword, otp: Number(otp) };
  let body = {};
  if (selected === 0) {
    body = { username, ...temp };
  }
  else if (selected === 1) {
    body = { email, ...temp };
  }
  else {
    return window.noti.error('Bạn cần điền email hoặc username để lấy lại mật khẩu');
  }
  const reqBody = {
    body,
  }
  return callApi('change-password', { method: 'POST', data: reqBody })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        window.noti.success('Đổi mật khẩu thành công');
        dispatch(callApiUser());
      }
      if (code === 400) {
        if (message === 'OTP Invalid') return window.noti.error('Mã OTP không đúng! Đổi mật khẩu thất bại');
        window.noti.error('Đổi mật khẩu thất bại');
      }
    })
    .catch(err => {
      // window.noti.error('Đổi mật khẩu thất bại');
    });
};

export const getOtpCode = (username, type, email, selected) => (dispatch, getState) => {
  const pathUrl = type === 1 ? 'generate-otp' : 'forgot-password';
  let body = {};
  if (selected === 0) {
    body = { username };
  }
  else if (selected === 1) {
    body = { email };
  }
  const reqBody = {
    body,
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
        // data.userProfile.birthday = "abc";
        dispatch(receiveUserInfo(data.userProfile || {}));
        window.noti.success('Cập nhật thông tin tài khoản thành công');
        dispatch(callApiUser());
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
        dispatch(getAvatar())
        dispatch({
          type: actionTypes.UPDATE_AVATAR,
          avatar: imgBase64,
        });
        // window.noti.success('Thay đổi ảnh đại diện thành công');
      }
      if (code === 400) {
        window.noti.success('Thay đổi ảnh đại diện thất bại');
      }
    })
    .catch(err => {

    });
};

export const getAvatar = () => (dispatch, getState) => {
  return callApi('api/profile/get-img', { method: 'POST' })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        console.log("getAvatar -> data", data)
        dispatch({
          type: actionTypes.UPDATE_AVATAR_USER,
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

export const sendMessage = (message) => (dispatch, getState) => {
  const reqBody = {
    body: {
      message,
    }
  }
  return callApi('chat', { method: 'POST', data: reqBody })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        // dispatch({
        //   type: actionTypes.UPDATE_AVATAR_USER,
        //   avatar: data.message,
        // });
        // window.noti.success('Thay đổi ảnh đại diện thành công');
        return data.message;
      }
      if (code === 400) {
        // window.noti.success('Thay đổi ảnh đại diện thất bại');
      }
    })
    .catch(err => {

    });
}

export const changeLayout = (layout) => (dispatch, getState) => {
  dispatch({
    type: 'CHANGE_LAYOUT',
    layout,
  });
}

export const toggleSidebar = () => (dispatch, getState) => {
  dispatch({
    type: 'TOGGLE_SIDEBAR',
  });
}

export const init = () => dispatch => {
  const accessToken = localStorage.getItem('accessToken');
  const accessToken1 = getCookie('_accessToken');
  console.log("accessToken1", accessToken1);
  let obj = {};
  try {
    obj = JSON.parse(atob(accessToken.split('.')[1]));
    console.log("obj", obj)
  } catch (error) {
    obj = {};
  };

  dispatch({
    type: actionTypes.RECEIVE_ACCESS_TOKEN,
    accessToken,
    role: obj.ROLE || '',
    fullname: obj.fullname,
    isDone: true,
  });
  dispatch(getAvatar());
  console.log("getAvatar")
  dispatch(getUserInfo());
  console.log("getUserInfo")
}

export const receiveUserInfo = (user) => ({
  type: actionTypes.GET_USER_INFO,
  user,
});

export const callApiUser = (callUser) => ({
  type: actionTypes.CALL_API_USER,
  callUser,
});