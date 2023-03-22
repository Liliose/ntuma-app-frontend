import {
  IAction,
  IWalletTransaction,
  IWalletTransactionsReducer,
} from '../../interfaces';
import {
  SET_IS_LOADING_WALLET_TRANSACTIONS,
  SET_WALLET_TRANSACTIONS,
  RESET_WALLET_TRANSACTIONS,
  Add_NEW_TRANSACTION,
  SET_ADD_OR_UPDATE_WALLET_TRANSACTION,
  SET_DELETE_WALLET_TRANSACTIONS,
} from '../actions/walletTransactions';

const initialState: IWalletTransactionsReducer = {
  transactions: [],
  isLoading: false,
};

const walletTransactionsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_WALLET_TRANSACTIONS:
      return {...state, transactions: action.payload as IWalletTransaction[]};
    case SET_ADD_OR_UPDATE_WALLET_TRANSACTION: {
      const newState = state.transactions;
      const index = newState.findIndex(item => item.id == action.payload);
      if (index >= 0) {
        newState[index] = action.payload;
        return {
          ...state,
          transactions: newState as IWalletTransaction[],
        };
      } else {
        return {
          ...state,
          transactions: [action.payload, ...newState] as IWalletTransaction[],
        };
      }
    }
    case SET_DELETE_WALLET_TRANSACTIONS: {
      const newState = state.transactions.filter(
        item => item.id != action.payload,
      );
      return {
        ...state,
        transactions: newState as IWalletTransaction[],
      };
    }
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
