import {IAction, ISystemFees, ISystemFeesReducer} from '../../interfaces';
import {
  RESET_SYSTEM_FEES,
  SET_IS_LOADING_SYSTEM_FEES,
  SET_SYSTEM_FEES,
} from '../actions/systemFees';

const initialState: ISystemFeesReducer = {
  fees: {id: 0, amount: 100, createdAt: '', updatedAt: ''},
  isLoading: false,
};

const systemFeesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_SYSTEM_FEES:
      return {...state, fees: action.payload as ISystemFees};
    case SET_IS_LOADING_SYSTEM_FEES:
      return {...state, isLoading: action.payload as boolean};
    case RESET_SYSTEM_FEES:
      return initialState;
    default:
      return state;
  }
};

export default systemFeesReducer;
