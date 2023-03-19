import {IAction, IRecentSearchesReducer} from '../../interfaces';
import {
  SET_RECENT_SEARCHES,
  ADD_RECENT_SEARCH,
  REMOVE_RECENT_SEARCH,
  RESET_RECENT_SEARCHES,
} from '../actions/recentSearches';

const initialState: IRecentSearchesReducer = {
  searches: [],
};

const RECENT_SEARCHESReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_RECENT_SEARCHES:
      return {...state, searches: action.payload as string[]};
    case ADD_RECENT_SEARCH:
      return {
        ...state,
        searches: [action.payload, ...state.searches] as string[],
      };
    case REMOVE_RECENT_SEARCH:
      return {
        ...state,
        searches: state.searches.filter(
          item => item.toLowerCase() !== action.payload.toLowerCase(),
        ) as string[],
      };
    case RESET_RECENT_SEARCHES:
      return initialState;
    default:
      return state;
  }
};

export default RECENT_SEARCHESReducer;
