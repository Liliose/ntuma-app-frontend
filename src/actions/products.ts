import axios from 'axios';
import {IProduct} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler} from '../helpers';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_IS_LOADING_PRODUCTS = 'SET_IS_LOADING_PRODUCTS';
export const RESET_PRODUCTS = 'RESET_PRODUCTS';

interface IAction {
  type: string;
  payload: any;
}
export const setProducts = (categories: IProduct[]): IAction => ({
  type: SET_PRODUCTS,
  payload: categories,
});
export const setIsLoadingProducts = (value: boolean): IAction => ({
  type: SET_IS_LOADING_PRODUCTS,
  payload: value,
});

export const resetProducts = () => ({type: RESET_PRODUCTS});

export const fetchProducts = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingProducts(true));
  axios
    .get(app.BACKEND_URL + '/products/')
    .then(res => {
      dispatch(setIsLoadingProducts(false));
      dispatch({
        type: SET_PRODUCTS,
        payload: res.data.products,
      });
    })
    .catch(error => {
      dispatch(setIsLoadingProducts(false));
      errorHandler(error);
    });
};
