import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface IUser {
  token: string;
  fullName: string;
  email: string;
  role: string;
}
export interface IAction {
  type: string;
  payload: any;
}

export interface IAppConfig {
  BACKEND_URL: string;
  FILE_URL: string;
}

export interface INavigationProp {
  navigation: StackNavigationProp<any>;
  route?: RouteProp<any>;
}
export interface IMarket {
  mId: number;
  name: string;
  address: string;
  lat: string;
  long: string;
  image: string;
  isActive: boolean;
  createdAt: string;
}

export enum TOAST_MESSAGE_TYPES {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
}

export interface IMarketsReducer {
  markets: IMarket[];
  isLoading: boolean;
  selectedMarket: IMarket | undefined;
}
