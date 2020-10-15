import { actionTypes } from '../constants/actionTypes';

const initState = {
  id: null,
  questions: [],
  callingApiQ: null,
  pagination: {
    activePage: 1,
    
  }
};

const question = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CALL_API_QUESTION:
      return {
        ...state,
        callingApiQ: action.kind,
      };
    case actionTypes.GET_QUESTION_LIST:
      return {
        ...state,
        questions: action.questions,
      };
    case actionTypes.GET_QUESTION_DETAIL:
      return {
        ...state,
        ...action,
      };
    case actionTypes.DELETE_QUESTION:
      const temp = state.questions.filter(item => !action.deletedIds.includes(item.id));
      return {
        ...state,
        questions: temp,
      };
    case actionTypes.UPDATE_QUESTION:
      const temp2 = state.questions.filter(item => item.id !== action.question.id);
      return {
        ...state,
        questions: [action.question, ...temp2],
      };
    case actionTypes.CREATE_QUESTION:
      return {
        ...state,
        questions: [action.question, ...state.questions],
      };

    default:
      return state;
  }
};

export default question;
