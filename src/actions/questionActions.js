import { actionTypes } from "constants/actionTypes";
import callApi from "./common/callApi";
import { getObjLevel, getObjSubject } from "./common/getInfo";



export const createQuestion = (question, keyword) => (dispatch, getState) => {
  dispatch(callApiQuestion(keyword));
  const req = {
    question,
  };
  return callApi('api/exam/add', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch({
          type: actionTypes.CREATE_QUESTION,
          question,
        });
        window.noti.success('Thêm mới câu hỏi thành công');
        dispatch(callApiQuestion());
      }
      if (code === 400) {
        window.noti.error('Thêm mới câu hỏi thất bại');
        dispatch(callApiQuestion());
      }
    })
    .catch(err => {
      dispatch(callApiQuestion());
    });
};

export const updateQuestion = (question, keyword) => (dispatch, getState) => {
  dispatch(callApiQuestion(keyword));
  const req = {
    question,
  };
  return callApi('api/exam/add', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch({
          type: actionTypes.UPDATE_QUESTION,
          question,
        });
        window.noti.success('Cập nhật câu hỏi thành công');
        dispatch(callApiQuestion());
      }
      if (code === 400) {
        window.noti.error('Cập nhật câu hỏi thất bại');
        dispatch(callApiQuestion());
      }
    })
    .catch(err => {
      dispatch(callApiQuestion());
    });
};

export const deleteQuestion = (deletedIds, keyword) => (dispatch, getState) => {
  dispatch(callApiQuestion(keyword));
  const req = {
    deletedIds,
  };
  return callApi('api/exam/add', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch({
          type: actionTypes.DELETE_QUESTION,
          deletedIds,
        });
        window.noti.success('Xóa câu hỏi thành công');
        dispatch(callApiQuestion());
      }
      if (code === 400) {
        window.noti.error('Xóa câu hỏi thất bại');
        dispatch(callApiQuestion());
      }
    })
    .catch(err => {
      dispatch(callApiQuestion());
    });
};

export const changeActivePageQ = (activePage) => ({
  type: actionTypes.CHANGE_ACTIVE_PAGE_Q,
  activePage,
})

export const getQuestionList = (inputSearch, filter, activePage, pageSize) => (dispatch, getState) => {
  dispatch(changeActivePageQ(activePage));
  const req = {
    body: {
      pageNumber: activePage - 1,
      pageSize,
      question: inputSearch,
      ...filter,
    },
  };
  return callApi('api/question/get-all', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        const pagination = {
          activePage,
          pageSize,
          totalElements: data.questions.totalElements,
          totalPages: data.questions.totalPages,
        }
        dispatch({
          type: actionTypes.GET_QUESTION_LIST,
          questions: data.questions.content,
          pagination,
        });
        // window.noti.success('Xóa câu hỏi thành công');
        // dispatch(callApiQuestion());
      }
      if (code === 400) {
        // window.noti.error('Xóa câu hỏi thất bại');
        // dispatch(callApiQuestion());
      }
    })
    .catch(err => {
      // dispatch(callApiQuestion());
    });
};

export const getDetailQuestion = (id) => (dispatch, getState) => {
  const req = {
    body: {
      id,
    }
  };
  return callApi('api/question/get', { method: 'POST', data: req })
    // .then(({ data, code, message }) => {
    //   if (data && code === 200) {
    //     return data;
    //   }
    //   if (code === 400) {
    //     return {};
    //     // window.noti.error('Xóa câu hỏi thất bại');
    //     // dispatch(callApiQuestion());
    //   }
    // })
    // .catch(err => {
    //   return {};
    //   // dispatch(callApiQuestion());
    // });
};
export const addQuestionsIntoExam = (examId, questionIds) => (dispatch, getState) => {
  const req = {
    examId, questionIds,
  };
  return callApi('api/exam/add', { method: 'POST', data: req })
    .then(({ data, code, message }) => {
      if (data && code === 200) {
        dispatch({
          type: actionTypes.DELETE_QUESTION,
          questions: data.questions,
        });
        window.noti.success('Thêm câu hỏi vào đề thành công');
        // dispatch(callApiQuestion());
      }
      if (code === 400) {
        window.noti.error('Thêm câu hỏi vào đề thất bại');
        // dispatch(callApiQuestion());
      }
    })
    .catch(err => {
      // dispatch(callApiQuestion());
    });
};

export const callApiQuestion = (kind = null) => (dispatch) => {
  dispatch({
    type: actionTypes.CALL_API_EXAM,
    kind,
  });
}