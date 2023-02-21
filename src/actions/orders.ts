import axios from 'axios';
import {IOrder} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler, setHeaders} from '../helpers';

export const SET_ORDERS = 'SET_ORDERS';
export const SET_IS_LOADING_ORDERS = 'SET_IS_LOADING_ORDERS';
export const SET_UPDATE_ORDER = 'SET_UPDATE_ORDER';
export const RESET_ORDERS = 'RESET_ORDERS';

interface IAction {
  type: string;
  payload: any;
}
export const setOrders = (orders: IOrder[]): IAction => ({
  type: SET_ORDERS,
  payload: orders,
});
export const setUpdateOrder = (order: IOrder): IAction => ({
  type: SET_UPDATE_ORDER,
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
