import axios from 'axios';
import {IClient} from '../../interfaces';
import {app} from '../constants/app';
import {returnErroMessage, setHeaders} from '../helpers';

export const SET_CLIENTS = 'SET_CLIENTS';
export const SET_ADD_OR_UPDATE_CLIENT = 'SET_ADD_OR_UPDATE_CLIENT';
export const SET_DELETE_CLIENT = 'SET_DELETE_CLIENT';
export const SET_IS_LOADING_CLIENTS = 'SET_IS_LOADING_CLIENTS';
export const SET_LOADING_CLIENTS_ERROR = 'SET_LOADING_CLIENTS_ERROR';
export const RESET_CLIENTS = 'RESET_CLIENTS';

interface IAction {
  type: string;
  payload: any;
}
export const setClients = (categories: IClient[]): IAction => ({
  type: SET_CLIENTS,
  payload: categories,
});
export const setAddOrDeleteClient = (client: IClient): IAction => ({
  type: SET_CLIENTS,
  payload: client,
});
export const setDeleteClient = (client: IClient): IAction => ({
  type: SET_DELETE_CLIENT,
  payload: client,
});

export const setIsLoadingClients = (value: boolean): IAction => ({
  type: SET_IS_LOADING_CLIENTS,
  payload: value,
});

export const setLoadingClientsError = (value: string): IAction => ({
  type: SET_LOADING_CLIENTS_ERROR,
  payload: value,
});

export const resetClients = () => ({type: RESET_CLIENTS});

export const fetchClients = (): any => (dispatch: any, getState: any) => {
  const {user} = getState();
  dispatch(setIsLoadingClients(true));
  axios
    .get(app.BACKEND_URL + '/agents/list', setHeaders(user.token))
    .then(res => {
      dispatch(setIsLoadingClients(false));
      dispatch({
        type: SET_CLIENTS,
        payload: res.data.agents,
      });
    })
    .catch(error => {
      const err = returnErroMessage(error);
      dispatch(setIsLoadingClients(false));
      //   errorHandler(error);
      dispatch(setLoadingClientsError(err));
    });
};
