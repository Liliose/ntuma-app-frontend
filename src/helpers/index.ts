import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {useDispatch} from 'react-redux';
import {resetUser} from '../actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IMarket, TOAST_MESSAGE_TYPES} from '../../interfaces';
import {fetchProducts} from '../actions/products';
import {fetchCategories} from '../actions/categories';

//custom dispatcher hook
export const useResetUser = () => {
  const dispatch = useDispatch();
  return (payload: any) => {
    dispatch(resetUser());
  };
};

export const useLoadBasiData = () => {
  const dispatch = useDispatch();
  return (payload: any) => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
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

export const currencyFormatter = (num: any) => {
  if (
    isNaN(num) ||
    num === undefined ||
    num === null ||
    typeof num === 'undefined'
  ) {
    // throw new Error(`currencyFormatter Failed,not a NUM`)
    // console.log("Num:-", num)
    return '';
  }
  // console.log("Num:-", num)
  let sign = '';
  if (num < 0) {
    sign = '-';
  }
  const str = Math.abs(num).toString();
  let lastComma = 0;
  let lastDot = str.lastIndexOf('.');
  if (lastDot == -1) {
    lastComma = str.length - 4;
  } else {
    lastComma = lastDot - 4;
  }

  // console.log(lastComma);
  let newStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    if (i == lastComma) {
      newStr = ',' + newStr;
      lastComma -= 2;
    }

    newStr = str[i] + newStr;
  }
  if (sign === '-') {
    newStr = sign + newStr;
  }
  if (newStr.includes('e')) {
    return exponentialToFixed(newStr);
  }
  return newStr;
};

function exponentialToFixed(x: any) {
  if (Math.abs(+x) < 1.0) {
    let e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + new Array(e).join('0') + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
}
