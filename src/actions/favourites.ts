import {IProduct} from '../../interfaces';
export const SET_FAVOURITES = 'SET_FAVOURITES';
export const ADD_FAV_ITEM = 'ADD_FAV_ITEM';
export const REMOVE_FAV_ITEM = 'REMOVE_FAV_ITEM';
export const RESET_FAVOURITES = 'RESET_FAVOURITES';

interface IAction {
  type: string;
  payload: any;
}
export const setFavourites = (favourites: IProduct[]): IAction => ({
  type: SET_FAVOURITES,
  payload: favourites,
});
export const addFavouriteItem = (item: IProduct): IAction => ({
  type: ADD_FAV_ITEM,
  payload: item,
});

export const removeFavouriteItem = (item: IProduct): IAction => ({
  type: REMOVE_FAV_ITEM,
  payload: item,
});

export const resetFavourites = () => ({type: RESET_FAVOURITES});
