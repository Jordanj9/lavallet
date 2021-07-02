interface IUser {
  name: string;
  email: string;
  company: string;
}

type UserState = {
  user: IUser | {};
  isLogged: boolean;
};

type UserAction = {
  type: string;
  user: IUser | {};
};

type DispatchUserType = (args: UserAction) => UserAction;
