export const SET_USER_NAMES = 'SET_USER_NAMES';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_ROLE = 'SET_USER_ROLE';
export const SET_USER_ID = 'SET_USER_ID';
export const RESET_USER = 'RESET_USER';

interface IAction {
  type: string;
  payload: any;
}
export const setUserNames = (names: string): IAction => ({
  type: SET_USER_NAMES,
  payload: names,
});
export const setUserEmail = (value: string): IAction => ({
  type: SET_USER_EMAIL,
  payload: value,
});

export const setUserToken = (value: string): IAction => ({
  type: SET_USER_TOKEN,
  payload: value,
});

export const setUserRole = (value: string): IAction => ({
  type: SET_USER_ROLE,
  payload: value,
});

export const resetUser = () => ({type: RESET_USER});
