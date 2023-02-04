import axios from 'axios';
import {ICategory} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler} from '../helpers';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_IS_LOADING_CATEGORIES = 'SET_IS_LOADING_CATEGORIES';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const RESET_CATEGORIES = 'RESET_CATEGORIES';

interface IAction {
  type: string;
  payload: any;
}
export const setCategories = (categories: ICategory[]): IAction => ({
  type: SET_CATEGORIES,
  payload: categories,
});
export const setSelectedCategory = (category: ICategory): IAction => ({
  type: SET_SELECTED_CATEGORY,
  payload: category,
});
export const setIsLoadingCategories = (value: boolean): IAction => ({
  type: SET_IS_LOADING_CATEGORIES,
  payload: value,
});

export const resetCategories = () => ({type: RESET_CATEGORIES});

export const fetchCategories = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingCategories(true));
  axios
    .get(app.BACKEND_URL + '/categories/')
    .then(res => {
      dispatch({
        type: SET_CATEGORIES,
        payload: res.data.categories,
      });
    })
    .catch(error => {
      dispatch(setIsLoadingCategories(false));
      errorHandler(error);
    });
};
