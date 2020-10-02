import { actionTypes } from '../constants/actionTypes';

const initState = {
  accessToken: null,
  account: {
    id: null,
    role: [],
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
    birthday: new Date("2020-09-15T07:14:53.000+00:00"),
    examHistories: [],
  },
  layout: 0, //0 user, 1 admin
  isOpen: true,
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_ACCESS_TOKEN:
      console.log("auth -> role", action.role)
      return {
        ...state,
        accessToken: action.accessToken,
        account: {
          ...state.account,
          role: action.role,
        },
        user: {
          ...state.user,
          name: action.fullname,
        }
      };
    case actionTypes.GET_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.fullname,
          email: action.user.email,
          phone: action.user.phone,
          // avatar: action.user.avatar,
          birthday: new Date(action.user.birthday),
          gender: action.user.gender,
          clazz: action.user.clazz,
          school: action.user.school,
          // examHistories: action.user.examHistories,
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
    case 'CHANGE_LAYOUT':
      return {
        ...state,
        layout: action.layout,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isOpen: !state.isOpen,
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
