import axios from 'axios';
import {IProductPrice} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler} from '../helpers';

export const SET_PRODUCT_PRICES = 'SET_PRODUCT_PRICES';
export const SET_IS_LOADING_PRODUCT_PRICES = 'SET_IS_LOADING_PRODUCT_PRICES';
export const RESET_PRODUCT_PRICES = 'RESET_PRODUCT_PRICES';

interface IAction {
  type: string;
  payload: any;
}
export const setProductPrices = (categories: IProductPrice[]): IAction => ({
  type: SET_PRODUCT_PRICES,
  payload: categories,
});
export const setIsLoadingProductPrices = (value: boolean): IAction => ({
  type: SET_IS_LOADING_PRODUCT_PRICES,
  payload: value,
});

export const resetProductPrices = () => ({type: RESET_PRODUCT_PRICES});

export const fetchProductPrices = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingProductPrices(true));
  axios
    .get(app.BACKEND_URL + '/products/prices/')
    .then(res => {
      dispatch({
        type: SET_PRODUCT_PRICES,
        payload: res.data.prices,
      });
    })
    .catch(error => {
      dispatch(setIsLoadingProductPrices(false));
      errorHandler(error);
    });
};
