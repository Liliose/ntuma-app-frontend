import axios from 'axios';
import {ISystemFees} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler} from '../helpers';

export const SET_SYSTEM_FEES = 'SET_SYSTEM_FEES';
export const SET_IS_LOADING_SYSTEM_FEES = 'SET_IS_LOADING_SYSTEM_FEES';
export const RESET_SYSTEM_FEES = 'RESET_SYSTEM_FEES';

interface IAction {
  type: string;
  payload: any;
}
export const addOrdUpdateSystemFees = (fees: ISystemFees): IAction => ({
  type: SET_SYSTEM_FEES,
  payload: fees,
});
export const setIsLoadingSystemFees = (value: boolean): IAction => ({
  type: SET_IS_LOADING_SYSTEM_FEES,
  payload: value,
});

export const resetSystemFees = () => ({type: RESET_SYSTEM_FEES});

export const fetchSystemFees = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingSystemFees(true));
  axios
    .get(app.BACKEND_URL + '/systemfees')
    .then(res => {
      dispatch(setIsLoadingSystemFees(false));
      dispatch(addOrdUpdateSystemFees(res.data.fees));
    })
    .catch(error => {
      dispatch(setIsLoadingSystemFees(false));
      errorHandler(error);
    });
};
