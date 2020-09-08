import { actionTypes } from '../constants/actionTypes';

const initState = {
  id: null,

};

const exam = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_EXAM:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case actionTypes.DELETE_EXAM:
      return {
        ...state,
        ...action,
      };
    case actionTypes.UPDATE_EXAM:
      return {
        ...state,
        ...action,
      };
    case actionTypes.CREATE_EXAM:
      return {
        ...state,
        ...action,
      };
    case actionTypes.SUBMIT_EXAM:
      return {
        ...state,
        ...action,
      };
    case actionTypes.GET_RESULT_EXAM:
      return {
        ...state,
        ...action,
      };
    case actionTypes.CREATE_QUESTION:
      return {
        ...state,
        ...action,
      };

    default:
      return state;
  }
};

export default exam;
