import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {useDispatch} from 'react-redux';
import {resetUser} from '../actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IMarket, TOAST_MESSAGE_TYPES} from '../../interfaces';

//custom dispatcher hook
export const useResetUser = () => {
  const dispatch = useDispatch();
  return (payload: any) => {
    dispatch(resetUser());
  };
};

export const toastMessage = (type: TOAST_MESSAGE_TYPES, message: string) => {
  if (type === TOAST_MESSAGE_TYPES.SUCCESS) {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: message,
    });
  }
  if (type === TOAST_MESSAGE_TYPES.ERROR) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: message,
    });
  }
  if (type === TOAST_MESSAGE_TYPES.INFO) {
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: 'Warning',
      textBody: message,
    });
  }
};

export const errorHandler = (error: any) => {
  if (error?.response?.data?.msg) {
    toastMessage(TOAST_MESSAGE_TYPES.ERROR, error.response.data.msg);
  } else if (error.message) {
    toastMessage(TOAST_MESSAGE_TYPES.ERROR, error.message);
  } else {
    toastMessage(TOAST_MESSAGE_TYPES.ERROR, error);
  }
  handleAuthError(error);
};

export const handleAuthError = (error: any) => {
  if (error?.response?.status == 401) {
    AsyncStorage.clear();
  }
};

export const getRandomPositionOfAnArray = (arraySize: number) => {
  const max = arraySize;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const validateSelectedMarket = (allMarkets: IMarket[], index: any) => {
  try {
    if (index !== '') {
      if (Number(index) < allMarkets.length) {
        return true;
      }
      return false;
    }
    return false;
  } catch (error) {
    toastMessage(TOAST_MESSAGE_TYPES.ERROR, 'Please choose Market');
    return false;
  }
};
