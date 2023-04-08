import {IAction, IPackagingFeesReducer, IPackagingFees} from '../../interfaces';
import {
  RESET_PACKAGING_FEES,
  SET_IS_LOADING_PACKAGING_FEES,
  SET_PACKAGING_FEES,
} from '../actions/packagingFees';

const initialState: IPackagingFeesReducer = {
  fees: {id: 0, amount: 100, createdAt: '', updatedAt: ''},
  isLoading: false,
};

const systemFeesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_PACKAGING_FEES:
      return {...state, fees: action.payload as IPackagingFees};
    case SET_IS_LOADING_PACKAGING_FEES:
      return {...state, isLoading: action.payload as boolean};
    case RESET_PACKAGING_FEES:
      return initialState;
    default:
      return state;
  }
};

export default systemFeesReducer;
