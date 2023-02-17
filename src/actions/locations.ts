import {ILocation} from '../../interfaces';
export const SET_LOCATIONS = 'SET_LOCATIONS';
export const ADD_LOCATION = 'ADD_LOCATION';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';
export const RESET_LOCATIONS = 'RESET_LOCATIONS';

interface IAction {
  type: string;
  payload: any;
}
export const setLocations = (locations: ILocation[]): IAction => ({
  type: SET_LOCATIONS,
  payload: locations,
});
export const addLocation = (item: ILocation): IAction => ({
  type: ADD_LOCATION,
  payload: item,
});

export const removeLocation = (item: ILocation): IAction => ({
  type: REMOVE_LOCATION,
  payload: item,
});

export const resetLocations = () => ({type: RESET_LOCATIONS});
