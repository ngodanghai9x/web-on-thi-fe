import { actionTypes } from "constants/actionTypes";
import callApi from "./common/callApi";

export const getExam = (type) => (dispatch, getState) => {
  const req = {
    body: {

    }
  };
  return callApi('api/get', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {

        window.noti.success('Đăng nhập thành công');
      }
      if (code === 400) {
        window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
      }
    })
    .catch(err => {
    });
};

export const changeSubject = (kind, subject) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.CHANGE_SUBJECT,
    kind,
    subject,
  })
};
/*
export const getExam1 = (type) => (dispatch, getState) => {
  const req = {
    body: {

    }
  };
  return callApi('api/get', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {

        window.noti.success('Đăng nhập thành công');
      }
      if (code === 400) {
        window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
      }
    })
    .catch(err => {
    });
};

export const getExam1 = (type) => (dispatch, getState) => {
  const req = {
    body: {

    }
  };
  return callApi('api/get', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {

        window.noti.success('Đăng nhập thành công');
      }
      if (code === 400) {
        window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
      }
    })
    .catch(err => {
    });
};

export const getExam1 = (type) => (dispatch, getState) => {
  const req = {
    body: {

    }
  };
  return callApi('api/get', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {

        window.noti.success('Đăng nhập thành công');
      }
      if (code === 400) {
        window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
      }
    })
    .catch(err => {
    });
};

export const getExam1 = (type) => (dispatch, getState) => {
  const req = {
    body: {

    }
  };
  return callApi('api/get', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {

        window.noti.success('Đăng nhập thành công');
      }
      if (code === 400) {
        window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
      }
    })
    .catch(err => {
    });
};

export const getExam1 = (type) => (dispatch, getState) => {
  const req = {
    body: {

    }
  };
  return callApi('api/get', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {

        window.noti.success('Đăng nhập thành công');
      }
      if (code === 400) {
        window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
      }
    })
    .catch(err => {
    });
};

export const getExam1 = (type) => (dispatch, getState) => {
  const req = {
    body: {

    }
  };
  return callApi('api/get', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {

        window.noti.success('Đăng nhập thành công');
      }
      if (code === 400) {
        window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
      }
    })
    .catch(err => {
    });
};
*/