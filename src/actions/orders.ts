import axios from 'axios';
import {IOrder} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler, setHeaders} from '../helpers';

export const SET_ORDERS = 'SET_ORDERS';
export const SET_ADD_OR_UPDATE_ORDER = 'SET_ADD_OR_UPDATE_ORDER';
export const SET_DELETE_ORDER = 'SET_DELETE_ORDER';
export const SET_IS_LOADING_ORDERS = 'SET_IS_LOADING_ORDERS';
export const RESET_ORDERS = 'RESET_ORDERS';

interface IAction {
  type: string;
  payload: any;
}
export const setOrders = (orders: IOrder[]): IAction => ({
  type: SET_ORDERS,
  payload: orders,
});
export const setAddOrUpdateOrder = (order: IOrder): IAction => ({
  type: SET_ADD_OR_UPDATE_ORDER,
  payload: order,
});
export const setDeleteOrder = (order: IOrder): IAction => ({
  type: SET_DELETE_ORDER,
  payload: order,
});
export const setIsLoadingOrders = (value: boolean): IAction => ({
  type: SET_IS_LOADING_ORDERS,
  payload: value,
});

export const resetOrders = () => ({type: RESET_ORDERS});

export const fetchOrders = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingOrders(true));
  const {user} = getState();
  axios
    .get(app.BACKEND_URL + '/orders/', setHeaders(user.token))
    .then(res => {
      dispatch(setIsLoadingOrders(false));
      dispatch({
        type: SET_ORDERS,
        payload: res.data.orders,
      });
    })
    .catch(error => {
      dispatch(setIsLoadingOrders(false));
      errorHandler(error);
    });
};
