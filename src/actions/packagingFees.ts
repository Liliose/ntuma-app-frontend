import axios from 'axios';
import {ISystemFees} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler} from '../helpers';

export const SET_PACKAGING_FEES = 'SET_PACKAGING_FEES';
export const SET_IS_LOADING_PACKAGING_FEES = 'SET_IS_LOADING_PACKAGING_FEES';
export const RESET_PACKAGING_FEES = 'RESET_PACKAGING_FEES';

interface IAction {
  type: string;
  payload: any;
}
export const addOrUpdatePackagingFees = (fees: ISystemFees): IAction => ({
  type: SET_PACKAGING_FEES,
  payload: fees,
});
export const setIsLoadingPackagingFees = (value: boolean): IAction => ({
  type: SET_IS_LOADING_PACKAGING_FEES,
  payload: value,
});

export const resetSystemFees = () => ({type: RESET_PACKAGING_FEES});

export const fethcPackagingFees = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingPackagingFees(true));
  axios
    .get(app.BACKEND_URL + '/systemfees')
    .then(res => {
      dispatch(setIsLoadingPackagingFees(false));
      dispatch(addOrUpdatePackagingFees(res.data.fees));
    })
    .catch(error => {
      dispatch(setIsLoadingPackagingFees(false));
      //   errorHandler(error);
    });
};
