import axios from 'axios';
import {IProduct} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler, returnErroMessage} from '../helpers';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCTS_SEARCH_RESULTS = 'SET_PRODUCTS_SEARCH_RESULTS';
export const SET_IS_LOADING_PRODUCTS = 'SET_IS_LOADING_PRODUCTS';
export const RESET_PRODUCTS = 'RESET_PRODUCTS';

export const SET_LOADING_PRODUCTS_ERROR = 'SET_LOADING_PRODUCTS_ERROR';
export const SET_IS_HARD_RELOADING_PRODUCTS = 'SET_IS_HARD_RELOADING_PRODUCTS';

interface IAction {
  type: string;
  payload: any;
}
export const setProducts = (products: IProduct[]): IAction => ({
  type: SET_PRODUCTS,
  payload: products,
});
export const setProductsSearchResults = (products: IProduct[]): IAction => ({
  type: SET_PRODUCTS_SEARCH_RESULTS,
  payload: products,
});
export const setIsLoadingProducts = (value: boolean): IAction => ({
  type: SET_IS_LOADING_PRODUCTS,
  payload: value,
});
export const setIsHardReLoadingProducts = (value: boolean): IAction => ({
  type: SET_IS_HARD_RELOADING_PRODUCTS,
  payload: value,
});
export const setLoadingProductsError = (value: string): IAction => ({
  type: SET_LOADING_PRODUCTS_ERROR,
  payload: value,
});

export const resetProducts = () => ({type: RESET_PRODUCTS});

export const fetchProducts = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingProducts(true));
  dispatch(setLoadingProductsError(''));
  axios
    .get(app.BACKEND_URL + '/products/')
    .then(res => {
      dispatch(setIsLoadingProducts(false));
      dispatch(setIsHardReLoadingProducts(false));
      dispatch({
        type: SET_PRODUCTS,
        payload: res.data.products,
      });
    })
    .catch(error => {
      const err = returnErroMessage(error);
      dispatch(setIsLoadingProducts(false));
      dispatch(setIsHardReLoadingProducts(false));
      // errorHandler(error);
      dispatch(setLoadingProductsError(err));
    });
};
