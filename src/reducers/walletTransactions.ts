import {
  IAction,
  IProductsReducer,
  IProduct,
  IWalletTransaction,
  IWalletTransactionsReducer,
} from '../../interfaces';
import {
  SET_IS_LOADING_WALLET_TRANSACTIONS,
  SET_WALLET_TRANSACTIONS,
  RESET_WALLET_TRANSACTIONS,
  Add_NEW_TRANSACTION,
} from '../actions/walletTransactions';

const initialState: IWalletTransactionsReducer = {
  transactions: [],
  isLoading: false,
};

const walletTransactionsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_WALLET_TRANSACTIONS:
      return {...state, transactions: action.payload as IWalletTransaction[]};
    case Add_NEW_TRANSACTION:
      return {
        ...state,
        transactions: [
          action.payload,
          ...state.transactions,
        ] as IWalletTransaction[],
      };
    case SET_IS_LOADING_WALLET_TRANSACTIONS:
      return {...state, isLoading: action.payload as boolean};
    case RESET_WALLET_TRANSACTIONS:
      return initialState;
    default:
      return state;
  }
};

export default walletTransactionsReducer;
