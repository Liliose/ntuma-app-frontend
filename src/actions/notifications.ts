import axios from 'axios';
import {INotificaton} from '../../interfaces';
import {app} from '../constants/app';
import {returnErroMessage, setHeaders} from '../helpers';

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const SET_ADD_OR_UPDATE_NOTIFICATION = 'SET_ADD_OR_UPDATE_NOTIFICATION';
export const SET_DELETE_NOTIFICATION = 'SET_DELETE_NOTIFICATION';
export const SET_IS_LOADING_NOTIFICATIONS = 'SET_IS_LOADING_NOTIFICATIONS';
export const SET_LOADING_NOTIFICATIONS_ERROR =
  'SET_LOADING_NOTIFICATIONS_ERROR';
export const SET_IS_HARD_RELOADING_NOTIFICATIONS =
  'SET_IS_HARD_RELOADING_NOTIFICATIONS';
export const SET_SHOW_CLEAR_ALL_NOTIFICATIONS_CONFIRMATION =
  'SET_SHOW_CLEAR_ALL_NOTIFICATIONS_CONFIRMATION';
export const RESET_NOTIFICATIONS = 'RESET_NOTIFICATIONS';

interface IAction {
  type: string;
  payload: any;
}
export const setNotifications = (orders: INotificaton[]): IAction => ({
  type: SET_NOTIFICATIONS,
  payload: orders,
});
export const setAddOrUpdateNotification = (
  notification: INotificaton,
): IAction => ({
  type: SET_ADD_OR_UPDATE_NOTIFICATION,
  payload: notification,
});
export const setDeleteNotification = (notification: INotificaton): IAction => ({
  type: SET_DELETE_NOTIFICATION,
  payload: notification,
});
export const setIsLoadingNotifications = (value: boolean): IAction => ({
  type: SET_IS_LOADING_NOTIFICATIONS,
  payload: value,
});
export const setShowClearAllNotificatonsConfirmation = (
  value: boolean,
): IAction => ({
  type: SET_SHOW_CLEAR_ALL_NOTIFICATIONS_CONFIRMATION,
  payload: value,
});

export const setIsHardReloadingNotifications = (value: boolean): IAction => ({
  type: SET_IS_HARD_RELOADING_NOTIFICATIONS,
  payload: value,
});

export const setLoadingNotificationsError = (value: string): IAction => ({
  type: SET_LOADING_NOTIFICATIONS_ERROR,
  payload: value,
});

export const resetNotifications = () => ({type: RESET_NOTIFICATIONS});

export const fetchNotifications = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingNotifications(true));
  dispatch(setLoadingNotificationsError(''));
  const {user} = getState();
  axios
    .get(app.BACKEND_URL + '/notifications/client/', setHeaders(user.token))
    .then(res => {
      dispatch(setIsLoadingNotifications(false));
      dispatch(setIsHardReloadingNotifications(false));
      dispatch(setNotifications(res.data.notifications));
    })
    .catch(error => {
      const err = returnErroMessage(error);
      dispatch(setIsLoadingNotifications(false));
      dispatch(setIsHardReloadingNotifications(false));
      dispatch(setLoadingNotificationsError(err));
    });
};

export const fetchNotifications2 =
  (): any => (dispatch: any, getState: any) => {
    dispatch(setIsLoadingNotifications(true));
    dispatch(setLoadingNotificationsError(''));
    const {user} = getState();
    axios
      .get(app.BACKEND_URL + '/notifications/read/', setHeaders(user.token))
      .then(r => {
        axios
          .get(
            app.BACKEND_URL + '/notifications/client/',
            setHeaders(user.token),
          )
          .then(res => {
            dispatch(setIsLoadingNotifications(false));
            dispatch(setIsHardReloadingNotifications(false));
            dispatch(setNotifications(res.data.notifications));
          })
          .catch(error => {
            const err = returnErroMessage(error);
            dispatch(setIsLoadingNotifications(false));
            dispatch(setIsHardReloadingNotifications(false));
            dispatch(setLoadingNotificationsError(err));
          });
      })
      .catch(error => {
        const err = returnErroMessage(error);
        dispatch(setIsLoadingNotifications(false));
        dispatch(setIsHardReloadingNotifications(false));
        dispatch(setLoadingNotificationsError(err));
      });
  };
