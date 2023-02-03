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
export interface IPatientRegisterRequest {
  names: string;
  ages: number;
  height: number;
  weight: number;
  sex: string;
}
export interface IPatient {
  _id: string;
  names: string;
  ages: number;
  height: number;
  weight: number;
  sex: string;
}
