import { actionTypes } from "constants/actionTypes";
import callApi from "./common/callApi";
import { getObjSubject } from "./common/getInfo";

export const getExamBySubject = (subject, level) => (dispatch, getState) => {
  const obj = getObjSubject(subject);
  const req = {
    body: {
      subject: obj.vn,
      grade: level,
    }
  };
  return callApi('exam-by-subject', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch({
          type: actionTypes.GET_EXAM_BY_SUBJECT,
          subject: obj.eng,
          level,
          exams: data.exam,
        })
        // window.noti.success('Đăng nhập thành công');
      }
      if (code === 400) {
        // window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
      }
    })
    .catch(err => {
    });
};

export const getDetailExam = (id, isAdmin) => (dispatch, getState) => {
  const url = isAdmin ? 'api/exam/get' : 'api/profile/get-exam';
  const req = {
    body: {
      id,
    }
  };
  return callApi(url, { method: 'POST', data: req })
    // .then(({ data, code, message }) => {
    //   if (data && code === 200) {
    //     dispatch({
    //       type: actionTypes.GET_DETAIL_EXAM,
    //       exam: data.exam,
    //     })
    //     // window.noti.success('Đăng nhập thành công');
    //   }
    //   if (code === 400) {
    //     // window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
    //   }
    // })
    // .catch(err => {
    // });
};

export const changeSubject = (level, subject) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.CHANGE_SUBJECT,
    level,
    subject,
  })
};

export const changeHeader = (header) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.CHANGE_HEADER,
    header,
  })
};

export const createExam = (name, image, subject, level, description, time, examQuestions) => (dispatch, getState) => {
  const obj = getObjSubject(subject);
  const req = {
    body: {
      exam: {
        name, image,
        subject: obj.vn,
        grade: level,
        description, time, examQuestions
      }
    }
  };
  return callApi('api/exam/add', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch({
          type: actionTypes.CREATE_EXAM,
          exam: data.exam,
          subject: obj.eng,
          level,
        });
        window.noti.success('Thêm mới đề thành công');
      }
      if (code === 400) {
        window.noti.error('Thêm mới đề thất bại');
      }
    })
    .catch(err => {
    });
};

export const updateExam = (name, image, subject, level, description, time, examQuestions) => (dispatch, getState) => {
  const obj = getObjSubject(subject);
  const req = {
    body: {
      exam: {
        name, image,
        subject: obj.vn,
        grade: level,
        description, time, examQuestions
      }
    }
  };
  return callApi('api/exam/update', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch({
          type: actionTypes.UPDATE_EXAM,
          exam: data.exam,
          subject: obj.eng,
          level,
        });
        window.noti.success('Cập nhật đề thành công');
      }
      if (code === 400) {
        window.noti.error('Cập nhật đề thất bại');
      }
    })
    .catch(err => {
    });
};

export const deleteExam = (id) => (dispatch, getState) => {
  const req = {
    body: {
      id,
    }
  };
  return callApi('api/get', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {

        window.noti.success('Xóa đề thành công');
      }
      if (code === 400) {
        window.noti.error('Xóa đề thất bại');
      }
    })
    .catch(err => {
    });
};

export const changeActiveExam = (id, isActive) => (dispatch, getState) => {
  const req = {
    body: {
      id,
      isActive,
    }
  };
  return callApi('api/exam/change-active', { method: 'POST', data: req })
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

export const doExam = (id, time, examAnswer) => (dispatch, getState) => {
  const req = {
    body: {
      id, time, examAnswer
    }
  };
  return callApi('api/profile/do-exam', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch(receiveResultExam(data.result));
        window.noti.success('Nộp bài thành công');
      }
      if (code === 400) {
        // dispatch(receiveResultExam({}));
        window.noti.error('Nộp bài thất bại');
      }
    })
    .catch(err => {
    });
};

export const getResultExam = (historyId) => (dispatch, getState) => {
  const req = {
    body: {
      historyId
    }
  };
  return callApi('api/profile/get-result', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch(receiveResultExam(data.result));
        // window.noti.success('Nộp bài thành công');
      }
      if (code === 400) {
        // dispatch(receiveResultExam({}));
        // window.noti.error('Nộp bài thất bại');
      }
    })
    .catch(err => {
    });
};

export const getAllExam = (pageNumber, pageSize) => (dispatch, getState) => {
  const req = {
    body: {
      pageSize,
      pageNumber,
    }
  };
  return callApi('api/exam/get-all', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        // id, name, image, subject, grade, description, time, canDelete, examQuestions
        dispatch({
          type: actionTypes.GET_ALL_EXAM,
          exams: data.examDtos.content,
        });

        // window.noti.success('Đăng nhập thành công');
      }
      if (code === 400) {
        // window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
      }
    })
    .catch(err => {
    });
};

export const getRankList = (examId) => (dispatch, getState) => {
  const req = {
    body: {
      examId
    }
  };
  return callApi('api/exam/get-all', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch({
          type: actionTypes.GET_RANK_LIST,
          rankList: data.ranking,
        })
        // window.noti.success('Đăng nhập thành công');
      }
      if (code === 400) {
        // window.noti.error('Tài khoản hoặc mật khẩu (mã OTP) không đúng');
      }
    })
    .catch(err => {
    });
};

const receiveResultExam = (result) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_RESULT_EXAM,
    result,
  })
}