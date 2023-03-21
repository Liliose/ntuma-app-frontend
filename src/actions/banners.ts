import axios from 'axios';
import {IBanner} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler, returnErroMessage} from '../helpers';

export const SET_BANNERS = 'SET_BANNERS';
export const SET_IS_LOADING_BANNERS = 'SET_IS_LOADING_BANNERS';
export const RESET_BANNERS = 'RESET_BANNERS';
export const SET_LOADING_BANNERS_ERROR = 'SET_LOADING_BANNERS_ERROR';
export const SET_IS_HARD_RELOADING_BANNERS = 'SET_IS_HARD_RELOADING_BANNERS';

interface IAction {
  type: string;
  payload: any;
}
export const setBanners = (banners: IBanner[]): IAction => ({
  type: SET_BANNERS,
  payload: banners,
});
export const setIsLoadingBanners = (value: boolean): IAction => ({
  type: SET_IS_LOADING_BANNERS,
  payload: value,
});
export const setIsHardReLoadingBanners = (value: boolean): IAction => ({
  type: SET_IS_HARD_RELOADING_BANNERS,
  payload: value,
});
export const setLoadingBannersError = (value: string): IAction => ({
  type: SET_LOADING_BANNERS_ERROR,
  payload: value,
});
export const resetBanners = () => ({type: RESET_BANNERS});

export const fetchBanners = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingBanners(true));
  dispatch(setLoadingBannersError(''));
  let mId = 0;
  const {markets} = getState();
  if (markets.selectedMarket) {
    mId = markets.selectedMarket.mId;
  }
  axios
    .get(app.BACKEND_URL + '/banners/' + mId)
    .then(res => {
      dispatch(setIsLoadingBanners(false));
      dispatch(setIsHardReLoadingBanners(false));
      dispatch({
        type: SET_BANNERS,
        payload: res.data.banners,
      });
    })
    .catch(error => {
      const err = returnErroMessage(error);
      dispatch(setIsLoadingBanners(false));
      dispatch(setIsHardReLoadingBanners(false));
      // errorHandler(error);
      dispatch(setLoadingBannersError(err));
    });
};
