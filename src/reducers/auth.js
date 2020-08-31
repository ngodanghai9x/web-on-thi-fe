import * as actionTypes from '../constants/actionTypes';

const initState = {
  accessToken: null,
  account: {
    id: null,
    role: null,
  },
  user: {
    name: null,
    email: null,
    birthday: null,
    gender: null
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
