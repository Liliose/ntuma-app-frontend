import {IAction, ILocation, ILocationsReducer} from '../../interfaces';
import {
  SET_LOCATIONS,
  ADD_LOCATION,
  REMOVE_LOCATION,
  RESET_LOCATIONS,
} from '../actions/locations';

const initialState: ILocationsReducer = {
  locations: [],
};

const locationsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return {...state, locations: action.payload as ILocation[]};
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.payload] as ILocation[],
      };
    case REMOVE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          item => item.name !== action.payload.name,
        ) as ILocation[],
      };
    case RESET_LOCATIONS:
      return initialState;
    default:
      return state;
  }
};

export default locationsReducer;
