import axios from 'axios';
import {IWalletTransaction} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler, setHeaders} from '../helpers';
import {setUserWalletAmount} from './user';

export const SET_WALLET_TRANSACTIONS = 'SET_WALLET_TRANSACTIONS';
export const SET_DELETE_WALLET_TRANSACTIONS = 'SET_DELETE_WALLET_TRANSACTIONS';
export const SET_ADD_OR_UPDATE_WALLET_TRANSACTION =
  'SET_ADD_OR_UPDATE_WALLET_TRANSACTION';
export const SET_IS_LOADING_WALLET_TRANSACTIONS =
  'SET_IS_LOADING_WALLET_TRANSACTIONS';
export const Add_NEW_TRANSACTION = 'Add_NEW_TRANSACTION';
export const RESET_WALLET_TRANSACTIONS = 'RESET_WALLET_TRANSACTIONS';

interface IAction {
  type: string;
  payload: any;
}
export const setWalletTransactions = (
  transactions: IWalletTransaction[],
): IAction => ({
  type: SET_WALLET_TRANSACTIONS,
  payload: transactions,
});

export const setAddOrdUpdateWalletTransaction = (
  transaction: IWalletTransaction,
): IAction => ({
  type: SET_ADD_OR_UPDATE_WALLET_TRANSACTION,
  payload: transaction,
});
export const setDeleteWalletTransaction = (
  transaction: IWalletTransaction,
): IAction => ({
  type: SET_DELETE_WALLET_TRANSACTIONS,
  payload: transaction,
});

export const addNewTransaction = (
  transaction: IWalletTransaction,
): IAction => ({
  type: Add_NEW_TRANSACTION,
  payload: transaction,
});

export const setIsLoadingWalletTransactions = (value: boolean): IAction => ({
  type: SET_IS_LOADING_WALLET_TRANSACTIONS,
  payload: value,
});

export const resetWalletTransactions = () => ({
  type: RESET_WALLET_TRANSACTIONS,
});

export const fetchWalletTransactions =
  (): any => (dispatch: any, getState: any) => {
    const {user} = getState();
    dispatch(setIsLoadingWalletTransactions(true));
    axios
      .get(app.BACKEND_URL + '/wallet/', setHeaders(user.token))
      .then(res => {
        dispatch(setIsLoadingWalletTransactions(false));
        dispatch({
          type: SET_WALLET_TRANSACTIONS,
          payload: res.data.transactions,
        });
        dispatch(setUserWalletAmount(res.data.walletAmounts));
      })
      .catch(error => {
        dispatch(setIsLoadingWalletTransactions(false));
        errorHandler(error);
      });
  };
