import axios from 'axios';
import {IMessage} from '../../interfaces';
import {app} from '../constants/app';
import {returnErroMessage, setHeaders} from '../helpers';

export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_ADD_OR_UPDATE_MESSAGE = 'SET_ADD_OR_UPDATE_MESSAGE';
export const SET_DELETE_MESSAGE = 'SET_DELETE_MESSAGE';
export const SET_SINGLE_MESSAGE = 'SET_SINGLE_MESSAGE';
export const SET_IS_LOADING_MESSAGES = 'SET_IS_LOADING_MESSAGES';
export const SET_LOADING_MESSAGES_ERROR = 'SET_LOADING_MESSAGES_ERROR';
export const SET_REMOVE_MESSAGE = 'SET_REMOVE_MESSAGE';
export const SET_IS_HARD_RELOADING_MESSAGES = 'SET_IS_HARD_RELOADING_MESSAGES';
export const RESET_MESSAGES = 'RESET_MESSAGES';

interface IAction {
  type: string;
  payload: any;
}
export const setMessages = (messages: IMessage[]): IAction => ({
  type: SET_MESSAGES,
  payload: messages,
});
export const setAddOrUpdateMessages = (message: IMessage): IAction => ({
  type: SET_ADD_OR_UPDATE_MESSAGE,
  payload: message,
});
export const setDeleteMessages = (message: IMessage): IAction => ({
  type: SET_DELETE_MESSAGE,
  payload: message,
});
export const setAddSingleMessage = (message: IMessage): IAction => ({
  type: SET_SINGLE_MESSAGE,
  payload: message,
});
export const removeMessage = (message: IMessage): IAction => ({
  type: SET_REMOVE_MESSAGE,
  payload: message,
});
export const setIsLoadingMessages = (value: boolean): IAction => ({
  type: SET_IS_LOADING_MESSAGES,
  payload: value,
});

export const setIsHardReloadingMessages = (value: boolean): IAction => ({
  type: SET_IS_HARD_RELOADING_MESSAGES,
  payload: value,
});

export const setLoadingMessagesError = (value: string): IAction => ({
  type: SET_IS_LOADING_MESSAGES,
  payload: value,
});

export const resetMessages = () => ({type: RESET_MESSAGES});

export const fetchMessages = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingMessages(true));
  dispatch(setLoadingMessagesError(''));
  const {user} = getState();
  axios
    .get(app.BACKEND_URL + '/messages/', setHeaders(user.token))
    .then(res => {
      dispatch(setIsLoadingMessages(false));
      dispatch(setIsHardReloadingMessages(false));
      dispatch(setMessages(res.data.messages));
    })
    .catch(error => {
      const err = returnErroMessage(error);
      dispatch(setIsLoadingMessages(false));
      dispatch(setIsHardReloadingMessages(false));
      dispatch(setLoadingMessagesError(err));
    });
};
