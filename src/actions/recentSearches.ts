import {IProduct} from '../../interfaces';
export const SET_RECENT_SEARCHES = 'SET_RECENT_SEARCHES';
export const ADD_RECENT_SEARCH = 'ADD_RECENT_SEARCH';
export const REMOVE_RECENT_SEARCH = 'REMOVE_RECENT_SEARCH';
export const RESET_RECENT_SEARCHES = 'RESET_RECENT_SEARCHES';

interface IAction {
  type: string;
  payload: any;
}
export const setRecentSearches = (searches: string[]): IAction => ({
  type: SET_RECENT_SEARCHES,
  payload: searches,
});
export const addRecentSearchItem = (item: string): IAction => ({
  type: ADD_RECENT_SEARCH,
  payload: item,
});

export const removeRecentSearchItem = (item: string): IAction => ({
  type: REMOVE_RECENT_SEARCH,
  payload: item,
});

export const resetRecentSearches = () => ({type: RESET_RECENT_SEARCHES});
