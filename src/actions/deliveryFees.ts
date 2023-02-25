import axios from 'axios';
import {IDeliveryFee} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler} from '../helpers';

export const SET_DELIVERY_FEES = 'SET_DELIVERY_FEES';
export const SET_IS_LOADING_DELIVERY_FEES = 'SET_IS_LOADING_DELIVERY_FEES';
export const RESET_DELIVERY_FEES = 'RESET_DELIVERY_FEES';

interface IAction {
  type: string;
  payload: any;
}
export const setDeliveryFees = (fees: IDeliveryFee[]): IAction => ({
  type: SET_DELIVERY_FEES,
  payload: fees,
});

export const setIsLoadingDeliveryFees = (value: boolean): IAction => ({
  type: SET_IS_LOADING_DELIVERY_FEES,
  payload: value,
});

export const resetFees = () => ({type: RESET_DELIVERY_FEES});

export const fetchDeliveryFees = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingDeliveryFees(true));
  axios
    .get(app.BACKEND_URL + '/fees/')
    .then(res => {
      dispatch(setIsLoadingDeliveryFees(false));
      dispatch({
        type: SET_DELIVERY_FEES,
        payload: res.data.fees,
      });
    })
    .catch(error => {
      dispatch(setIsLoadingDeliveryFees(false));
      errorHandler(error);
    });
};
