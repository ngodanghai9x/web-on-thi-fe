import { actionTypes } from '../constants/actionTypes';

const initState = {
  id: null,
  activeCollegeSub: 'toan',
  activeHSSub: 'toan',
  college: {
    math: [
      {},
    ],
    literature: [
      {},
    ],
    english: [
      {},
    ],
    physics: [
      {},
    ],
    chemistry: [
      {},
    ],
    biology: [
      {},
    ],
    history: [
      {},
    ],
    geography: [
      {},
    ],
  },
  highSchool: {
    math: [
      {},
    ],
    literature: [
      {},
    ],
    english: [
      {},
    ],
    physics: [
      {},
    ],
    chemistry: [
      {},
    ],
    biology: [
      {},
    ],
    history: [
      {},
    ],
    geography: [
      {},
    ],
  }
};

const exam = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SUBJECT:
      if (action.kind === 10) {
        return {
          ...state,
          activeCollegeSub: action.subject,
        }
      }
      return {
        ...state,
        activeCollegeSub: action.subject,
      };
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
