export const SET_LANGUAGE = 'SET_LANGUAGE';
export const RESET_LANGUAGE = 'RESET_LANGUAGE';

interface IAction {
  type: string;
  payload: any;
}
export const setLanguage = (language: string): IAction => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const resetCart = () => ({type: RESET_LANGUAGE});
