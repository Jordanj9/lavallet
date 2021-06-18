import * as actionTypes from "../actionTypes/userTypes";

export function signIn(user: IUser) {
  window.localStorage.setItem("company", user.company);
  const action: UserAction = {
    type: actionTypes.SIGN_IN,
    user
  };

  return (dispatch: DispatchUserType) => {
    dispatch(action);
  };
}

export function logout() {
  window.localStorage.clear();
  const user = {};
  const action: UserAction = {
    type: actionTypes.LOGOUT,
    user
  };

  return (dispatch: DispatchUserType) => {
    dispatch(action);
  };
}
