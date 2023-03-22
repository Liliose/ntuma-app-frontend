import axios from 'axios';
import {ICategory} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler, returnErroMessage} from '../helpers';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_IS_LOADING_CATEGORIES = 'SET_IS_LOADING_CATEGORIES';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const RESET_CATEGORIES = 'RESET_CATEGORIES';
export const SET_ADD_OR_UPDATE_CATEGORY = 'SET_ADD_OR_UPDATE_CATEGORY';
export const SET_DELETE_CATEGORY = 'SET_DELETE_CATEGORY';
export const SET_LOADING_CATEGORIES_ERROR = 'SET_LOADING_CATEGORIES_ERROR';
export const SET_IS_HARD_RELOADING_CATEGORIES =
  'SET_IS_HARD_RELOADING_CATEGORIES';

interface IAction {
  type: string;
  payload: any;
}
export const setCategories = (categories: ICategory[]): IAction => ({
  type: SET_CATEGORIES,
  payload: categories,
});
export const setAddOrUpdateCategory = (category: ICategory): IAction => ({
  type: SET_ADD_OR_UPDATE_CATEGORY,
  payload: category,
});
export const setDeleteCategory = (category: ICategory): IAction => ({
  type: SET_DELETE_CATEGORY,
  payload: category,
});
export const setSelectedCategory = (category: ICategory): IAction => ({
  type: SET_SELECTED_CATEGORY,
  payload: category,
});
export const setIsLoadingCategories = (value: boolean): IAction => ({
  type: SET_IS_LOADING_CATEGORIES,
  payload: value,
});
export const setIsHardReLoadingCategories = (value: boolean): IAction => ({
  type: SET_IS_HARD_RELOADING_CATEGORIES,
  payload: value,
});
export const setLoadingCategoriesError = (value: string): IAction => ({
  type: SET_LOADING_CATEGORIES_ERROR,
  payload: value,
});
export const resetCategories = () => ({type: RESET_CATEGORIES});

export const fetchCategories = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingCategories(true));
  dispatch(setLoadingCategoriesError(''));
  axios
    .get(app.BACKEND_URL + '/categories/')
    .then(res => {
      dispatch(setIsLoadingCategories(false));
      dispatch(setIsHardReLoadingCategories(false));
      dispatch({
        type: SET_CATEGORIES,
        payload: res.data.categories,
      });
    })
    .catch(error => {
      const err = returnErroMessage(error);
      dispatch(setIsLoadingCategories(false));
      dispatch(setIsHardReLoadingCategories(false));
      // errorHandler(error);
      dispatch(setLoadingCategoriesError(err));
    });
};
