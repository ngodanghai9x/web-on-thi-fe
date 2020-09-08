import { actionTypes } from '../constants/actionTypes';

const initState = {
  accessToken: null,
  account: {
    id: null,
    role: null,
    username: null,
  },
  user: {
    id: null,
    avatar: null,
    name: null,
    email: null,
    phone: null,
    school: null,
    gender: null,
    birthday: null,
  }
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case actionTypes.GET_USER_INFO:
      return {
        ...state,
        ...action,
      };
    case actionTypes.CREATE_ACCOUNT:
      return {
        ...state,
        ...action,
      };
    case actionTypes.UPDATE_USER_INFO:
      return {
        ...state,
        ...action,
      };
    case actionTypes.UPDATE_AVATAR_USER:
      return {
        ...state,
        ...action,
      };
    case actionTypes.UPDATE_EMAIL_USER:
      return {
        ...state,
        ...action,
      };
    case actionTypes.UPDATE_PHONE_USER:
      return {
        ...state,
        ...action,
      };
    case actionTypes.UPDATE_PASSWORD_USER:
      return {
        ...state,
        ...action,
      };

    default:
      return state;
  }
};

export default auth;
