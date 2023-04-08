import {IAction, IAgentsFees, IAgentsFeesReducer} from '../../interfaces';
import {
  RESET_AGENTS_FEES,
  SET_AGENTS_FEES,
  SET_IS_LOADING_AGENTS_FEES,
} from '../actions/agentsFees';

const initialState: IAgentsFeesReducer = {
  fees: {id: 0, amount: 100, createdAt: '', updatedAt: ''},
  isLoading: false,
};

const agentsFeesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_AGENTS_FEES:
      return {...state, fees: action.payload as IAgentsFees};
    case SET_IS_LOADING_AGENTS_FEES:
      return {...state, isLoading: action.payload as boolean};
    case RESET_AGENTS_FEES:
      return initialState;
    default:
      return state;
  }
};

export default agentsFeesReducer;
