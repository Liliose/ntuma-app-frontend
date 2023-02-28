import axios from 'axios';
import {IDish} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler} from '../helpers';

export const SET_DISHES = 'SET_DISHES';
export const SET_IS_LOADING_DISHES = 'SET_IS_LOADING_DISHES';
export const RESET_DISHES = 'RESET_DISHES';

interface IAction {
  type: string;
  payload: any;
}
export const setDishes = (dishes: IDish[]): IAction => ({
  type: SET_DISHES,
  payload: dishes,
});

export const setIsLoadingDishes = (value: boolean): IAction => ({
  type: SET_IS_LOADING_DISHES,
  payload: value,
});

export const resetDishes = () => ({type: RESET_DISHES});

export const fetchDishes = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingDishes(true));
  axios
    .get(app.BACKEND_URL + '/dishes/')
    .then(res => {
      dispatch(setIsLoadingDishes(false));
      dispatch({
        type: SET_DISHES,
        payload: res.data.dishes,
      });
    })
    .catch(error => {
      dispatch(setIsLoadingDishes(false));
      errorHandler(error);
    });
};
