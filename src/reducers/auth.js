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
    examHistories: [],
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
        user: {
          name: action.user.fullname,
          email: action.user.email,
          phone: action.user.phone,
          avatar: action.user.avatar,
          birthday: action.user.birthday,
          gender: action.user.gender,
          clazz: action.user.clazz,
          school: action.user.school,
          examHistories: action.user.examHistories,
        },
      };
    case actionTypes.UPDATE_AVATAR_USER:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.avatar,
        },
      };
    case actionTypes.UPDATE_EMAIL_USER:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email,
        },
      };
    case actionTypes.UPDATE_PHONE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          phone: action.phone,
        },
      };
    // case actionTypes.CREATE_ACCOUNT:
    //   return {
    //     ...state,
    //     ...action,
    //   };
    // case actionTypes.UPDATE_USER_INFO:
    //   return {
    //     ...state,
    //     ...action,
    //   };
    // case actionTypes.UPDATE_PASSWORD_USER:
    //   return {
    //     ...state,
    //     ...action,
    //   };
    default:
      return state;
  }
};

export default auth;
