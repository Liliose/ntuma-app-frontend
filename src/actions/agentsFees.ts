import axios from 'axios';
import {IAgentsFees} from '../../interfaces';
import {app} from '../constants/app';

export const SET_AGENTS_FEES = 'SET_AGENTS_FEES';
export const SET_IS_LOADING_AGENTS_FEES = 'SET_IS_LOADING_AGENTS_FEES';
export const RESET_AGENTS_FEES = 'RESET_AGENTS_FEES';

interface IAction {
  type: string;
  payload: any;
}
export const addOrdUpdateAgentsFees = (fees: IAgentsFees): IAction => ({
  type: SET_AGENTS_FEES,
  payload: fees,
});
export const setIsLoadingAgentsFees = (value: boolean): IAction => ({
  type: SET_IS_LOADING_AGENTS_FEES,
  payload: value,
});

export const resetAgentsFees = () => ({type: RESET_AGENTS_FEES});

export const fetchAgentsFees = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingAgentsFees(true));
  axios
    .get(app.BACKEND_URL + '/agents/fees')
    .then(res => {
      dispatch(setIsLoadingAgentsFees(false));
      dispatch(addOrdUpdateAgentsFees(res.data.fees));
    })
    .catch(error => {
      dispatch(setIsLoadingAgentsFees(false));
      //   errorHandler(error);
    });
};
