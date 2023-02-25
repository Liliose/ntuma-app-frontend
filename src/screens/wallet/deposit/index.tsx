import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import Modal from 'react-native-modal';
import {APP_COLORS} from '../../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  commonInput,
  viewFlexCenter,
  viewFlexSpace,
} from '../../../constants/styles';
import DisabledInput from '../../../components/disabled-input';
import axios from 'axios';
import {app} from '../../../constants/app';
import {errorHandler, setHeaders, toastMessage} from '../../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {TOAST_MESSAGE_TYPES} from '../../../../interfaces';
import {addNewTransaction} from '../../../actions/walletTransactions';

interface IDepositProps {
  showModal: boolean;
  setShowModal: any;
}
const initialState = {amount: '', paymentPhoneNumber: ''};
const Deposit = ({showModal, setShowModal}: IDepositProps) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state: RootState) => state.user);
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    const phoneRegex = /^07[8,2,3,9][0-9]{7}$/;
    if (state.amount.trim() === '') {
      setErrors({...errors, amount: 'Please enter amount you want to deposit'});
      return;
    } else {
      setErrors({...errors, amount: ''});
    }
    if (state.paymentPhoneNumber.trim() === '') {
      setErrors({
        ...errors,
        paymentPhoneNumber: 'Please enter payment phone number',
      });
      return;
    } else {
      setErrors({...errors, paymentPhoneNumber: ''});
    }
    if (!phoneRegex.test(state.paymentPhoneNumber)) {
      setErrors({
        ...errors,
        paymentPhoneNumber:
          'Invalid phone number, Please enter a valid MTN OR AIRTEL TIGO Phone number',
      });
      return;
    } else {
      setErrors({...errors, paymentPhoneNumber: ''});
    }
    axios
      .post(app.BACKEND_URL + '/wallet/', setHeaders(token))
      .then(res => {
        setShowModal(false);
        setIsSubmitting(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        dispatch(addNewTransaction(res.data.transaction));
      })
      .catch(error => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };

  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
      animationOutTiming={700}
      isVisible={showModal}
      onBackButtonPress={() => !isSubmitting && setShowModal(false)}
      style={{padding: 0, margin: 0}}>
      <View
        style={{
          backgroundColor: APP_COLORS.WHITE,
          marginRight: 20,
          marginLeft: 20,
          padding: 20,
          borderRadius: 10,
        }}>
        <View style={[viewFlexSpace]}>
          <Text
            style={{
              fontWeight: '700',
              marginBottom: 10,
              color: APP_COLORS.BLACK,
              fontSize: 16,
            }}>
            Make Deposit
          </Text>
          <View>
            <Pressable
              onPress={() => setShowModal(false)}
              disabled={isSubmitting}>
              <Icon name="close" size={25} color={APP_COLORS.BLACK} />
            </Pressable>
          </View>
        </View>
        <View style={{marginTop: 5}}>
          <View style={{marginBottom: 10}}>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>Amount to deposit</Text>
            <DisabledInput
              onChangeText={(text: string) =>
                setState({...state, amount: text})
              }
              value={state.amount}
              placeholder="Enter amount"
              style={{borderColor: APP_COLORS.PRODUCT_CARD_BORDER}}
              disabled={isSubmitting}
            />
            {errors.amount.trim() !== '' && (
              <Text style={{color: 'red'}}>{errors.amount}</Text>
            )}
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>
              Payment phone number (MTN,AIRTEL-TIGO)
            </Text>
            <DisabledInput
              onChangeText={(text: string) =>
                setState({...state, paymentPhoneNumber: text})
              }
              value={state.paymentPhoneNumber}
              placeholder="Ex:0788888888"
              style={{borderColor: APP_COLORS.PRODUCT_CARD_BORDER}}
              disabled={isSubmitting}
            />
            {errors.paymentPhoneNumber.trim() !== '' && (
              <Text style={{color: 'red'}}>{errors.paymentPhoneNumber}</Text>
            )}
          </View>
          <Pressable
            onPress={() => handleSubmit()}
            style={{marginBottom: 10, marginTop: 10}}
            disabled={isSubmitting}>
            <View style={[btnWithBgContainerStyles, viewFlexCenter]}>
              {isSubmitting && (
                <ActivityIndicator
                  color={APP_COLORS.WHITE}
                  style={{marginRight: 5}}
                />
              )}
              <Text style={[btnWithBgTextStyles]}>Deposit</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default Deposit;
