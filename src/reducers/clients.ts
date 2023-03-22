import {IAction, IClient, IclientsReducer} from '../../interfaces';
import {
  SET_LOADING_CLIENTS_ERROR,
  SET_IS_LOADING_CLIENTS,
  RESET_CLIENTS,
  SET_CLIENTS,
  SET_ADD_OR_UPDATE_CLIENT,
  SET_DELETE_CLIENT,
} from '../actions/clients';

const initialState: IclientsReducer = {
  clients: [],
  isLoading: false,
  loadingError: '',
};

const clientsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_CLIENTS:
      return {
        ...state,
        clients: action.payload as IClient[],
      };
    case SET_ADD_OR_UPDATE_CLIENT: {
      const newState = state.clients;
      const index = newState.findIndex(
        item => item.agentId == action.payload.agentId,
      );
      if (index >= 0) {
        newState[index] = action.payload;
        return {
          ...state,
          clients: newState as IClient[],
        };
      } else {
        return {
          ...state,
          clients: [action.payload, ...newState] as IClient[],
        };
      }
    }
    case SET_DELETE_CLIENT: {
      const newState = state.clients.filter(
        item => item.agentId != action.payload.agentId,
      );
      return {
        ...state,
        clients: newState as IClient[],
      };
    }
    case SET_IS_LOADING_CLIENTS:
      return {...state, isLoading: action.payload as boolean};
    case SET_LOADING_CLIENTS_ERROR:
      return {...state, loadingError: action.payload as string};
    case RESET_CLIENTS:
      return initialState;
    default:
      return state;
  }
};

export default clientsReducer;
