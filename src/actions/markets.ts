import axios from 'axios';
import {IMarket} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler} from '../helpers';

export const SET_MARKETS = 'SET_MARKETS';
export const SET_IS_LOADING_MARKETS = 'SET_IS_LOADING_MARKETS';
export const SET_SELECTED_MARKET = 'SET_SELECTED_MARKET';
export const RESET_MARKETS = 'RESET_MARKETS';

interface IAction {
  type: string;
  payload: any;
}
export const setMarkets = (markets: IMarket[]): IAction => ({
  type: SET_MARKETS,
  payload: markets,
});
export const setSelectedMarket = (market: IMarket | undefined): IAction => ({
  type: SET_SELECTED_MARKET,
  payload: market,
});
export const setIsLoadingMarkets = (value: boolean): IAction => ({
  type: SET_IS_LOADING_MARKETS,
  payload: value,
});

export const resetMarkets = () => ({type: RESET_MARKETS});

export const fetchMarkets = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingMarkets(true));
  axios
    .get(app.BACKEND_URL + '/markets/')
    .then(res => {
      dispatch(setIsLoadingMarkets(false));
      dispatch({
        type: SET_MARKETS,
        payload: res.data.markets,
      });
    })
    .catch(error => {
      dispatch(setIsLoadingMarkets(false));
      errorHandler(error);
    });
};
