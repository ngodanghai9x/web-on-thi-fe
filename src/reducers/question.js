import { actionTypes } from '../constants/actionTypes';

const initState = {
  id: null,

};

const question = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_QUESTION:
      return {
        ...state,
        ...action,
      };
    case actionTypes.DELETE_QUESTION:
      return {
        ...state,
        ...action,
      };
    case actionTypes.UPDATE_QUESTION:
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

export default question;
