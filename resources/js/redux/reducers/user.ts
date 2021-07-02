import * as actionTypes from "../actionTypes/userTypes";

const initialState: UserState = {
  user: {},
  isLogged: false
};

const user = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return {
        ...state,
        isLogged: true,
        user: action.user
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogged: false,
        user: action.user
      };
  }
  return state;
};

export default user;
