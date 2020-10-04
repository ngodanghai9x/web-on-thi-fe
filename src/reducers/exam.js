import { actionTypes } from '../constants/actionTypes';

const initState = {
  id: null,
  callingApi: '',
  activeCollegeSub: 'toan',
  activeHSSub: 'toan',
  header: 'Danh sách đề',
  //id, name, image, subject, grade,description, time, isActive, canDelete, examQuestions
  all: [],
  pagination: {
    activePage: 1,
    pageSize: 10,
    totalElements: 1,
    totalPages: 1,
  },
  rankList: [],
  currentExam: {},
  completedExams: [],
  result: {
    // examName,
    // examDescription,
    // numAnswer: 0,
    // numCorrectAns: 0,
    // doTime: 0,
    // totalTime: 0,
    // totalQuestion: 0,
    // examQuestions: [],
  },
  historyExam: [],
  paginationHistory: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalElements: 1,
  },
  college: {
    all: [],
    math: [],
    literature: [],
    english: [],
    physics: [],
    chemistry: [],
    biology: [],
    history: [],
    geography: [],
  },
  highSchool: {
    all: [],
    math: [],
    literature: [],
    english: [],
  },
};

const exam = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_HISTORY_EXAM:
      return {
        ...state,
        historyExam: action.content || [],
        paginationHistory: {
          ...state.paginationHistory,
          currentPage: action.currentPage,
          pageSize: action.pageSize,
          totalPages: action.totalPages,
          totalElements: action.totalElements,
        }
      };
    case actionTypes.CHANGE_HEADER:
      return {
        ...state,
        header: action.header,
      };
    case actionTypes.CHANGE_SUBJECT:
      if (action.grade === 10) {
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
      };
    case actionTypes.CHANGE_ACTIVE_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          activePage: action.activePage,
        }
      };
    case actionTypes.GET_COMPLETED_EXAMS:
      return {
        ...state,
        completedExams: action.completedExams,
      };
    case actionTypes.GET_ALL_EXAM:
      return {
        ...state,
        all: action.exams,
        pagination: {
          ...state.pagination,
          ...action.pagination,
        },
      };
    case actionTypes.CHANGE_ACTIVE_EXAM:
      const { all } = state;
      const newAll = all.map(item => {
        if (item.id === action.id) {
          item.isActive = !action.isActive;
        }
        return item;
      })
      return {
        ...state,
        all: newAll,
      };
    case actionTypes.GET_DETAIL_EXAM:
      return {
        ...state,
        currentExam: action.exam,
      };
    case actionTypes.GET_EXAM_BY_SUBJECT:
      return {
        ...state,
        [action.grade]: {
          ...state[action.grade],
          [action.subject]: action.exams,
          all: action.exams,
        },
      };
    case actionTypes.DELETE_EXAM:
      const temp2 = state.all.filter(item => !action.examIds.includes(item.id));
      return {
        ...state,
        all: [...temp2],
      };
    case actionTypes.UPDATE_EXAM:
      const temp = state.all.filter(item => item.id !== action.id);
      return {
        ...state,
        [action.grade]: {
          ...state[action.grade],
          [action.subject]: [action.exam, ...state[action.grade][action.subject]],
        },
        all: [action.exam, ...temp],
      };
    case actionTypes.CREATE_EXAM:
      return {
        ...state,
        [action.grade]: {
          ...state[action.grade],
          [action.subject]: [action.exam, ...state[action.grade][action.subject]],
        },
        all: [action.exam, ...state.all],
      };
    case actionTypes.SUBMIT_EXAM:
      return {
        ...state,
        // ...action,
      };
    case actionTypes.GET_RESULT_EXAM:
      return {
        ...state,
        result: action.result,
      };
    case actionTypes.GET_RANK_LIST:
      return {
        ...state,
        rankList: action.rankList,
      };

    default:
      return state;
  }
};

export default exam;
