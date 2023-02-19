import {IAction, IDeliveryFee, IDeliveryFeesReducer} from '../../interfaces';
import {
  SET_DELIVERY_FEES,
  SET_IS_LOADING_DELIVERY_FEES,
  RESET_DELIVERY_FEES,
} from '../actions/deliveryFees';

const initialState: IDeliveryFeesReducer = {
  fees: [],
  isLoading: false,
};

const feesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_DELIVERY_FEES:
      return {...state, fees: action.payload as IDeliveryFee[]};
    case SET_IS_LOADING_DELIVERY_FEES:
      return {...state, isLoading: action.payload as boolean};
    case RESET_DELIVERY_FEES:
      return initialState;
    default:
      return state;
  }
};

export default feesReducer;
