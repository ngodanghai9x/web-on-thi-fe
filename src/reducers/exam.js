import { actionTypes } from '../constants/actionTypes';

const initState = {
  id: null,
  callingApi: '',
  activeCollegeSub: 'toan',
  activeHSSub: 'toan',
  header: 'Danh sách đề',
  all: [],
  currentExam: {},
  completedExams: [],
  result: {
    // numAnswer: 0,
    // numCorrectAns: 0,
    // time: 0,
    // totalQuestion: 0,
    // examQuestions: [],
  },
  college: {
    all: [
      {},
    ],
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
    all: [
      {},
    ],
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
};

const exam = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_HEADER:
      return {
        ...state,
        header: action.header,
      };
    case actionTypes.CHANGE_SUBJECT:
      if (action.level === 10) {
        return {
          ...state,
          activeHSSub: action.subject,
        }
      }
      return {
        ...state,
        activeCollegeSub: action.subject,
      };
    case actionTypes.CALL_API_EXAM:
      return {
        ...state,
        callingApi: action.kind,
      }
    case actionTypes.GET_COMPLETED_EXAMS: 
      return {
        ...state,
        completedExams: action.completedExams,
      };
    case actionTypes.GET_ALL_EXAM:
      return {
        ...state,
        all: action.exams,
      };
    case actionTypes.GET_DETAIL_EXAM:
      return {
        ...state,
        currentExam: action.exam,
      };
    case actionTypes.GET_EXAM_BY_SUBJECT:
      return {
        ...state,
        [action.level]: {
          ...state[action.level],
          [action.subject]: action.exams,
          all: action.exams,
        },
      };
    case actionTypes.DELETE_EXAM:
      return {
        ...state,
        ...action,
      };
    case actionTypes.UPDATE_EXAM:
      return {
        ...state,
        [action.level]: {
          ...state[action.level],
          [action.subject]: [action.exam, ...state[action.level][action.subject]],
        },
        all: [action.exam, ...state.all],
      };
    case actionTypes.CREATE_EXAM:
      return {
        ...state,
        [action.level]: {
          ...state[action.level],
          [action.subject]: [action.exam, ...state[action.level][action.subject]],
        },
        all: [action.exam, ...state.all],
      };
    case actionTypes.SUBMIT_EXAM:
      return {
        ...state,
        ...action,
      };
    case actionTypes.GET_RESULT_EXAM:
      return {
        ...state,
        result: action.result,
      };
    case actionTypes.CREATE_QUESTION:
      return {
        ...state,
        result: action.result,
      };

    default:
      return state;
  }
};

export default exam;
