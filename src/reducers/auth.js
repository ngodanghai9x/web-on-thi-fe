import * as actionTypes from '../constants/actionTypes';

const initState = {
  accessToken: null,
  account: {
    id: null,
    role: null,
    username: null,
  },
  user: {
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
    default:
      return state;
  }
};

export default auth;
