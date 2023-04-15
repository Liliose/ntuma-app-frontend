import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {APP_COLORS} from '../../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  viewFlexSpace,
} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/Entypo';
import WhiteCard from '../../../components/white-card';
import {CHECKOUT_STEPS_ENUM, PAYMENT_METHODS} from '..';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {TOAST_MESSAGE_TYPES} from '../../../../interfaces';
import {toastMessage} from '../../../helpers';
import {t} from 'i18next';

interface IPaymentProps {
  paymentMethod: string;
  setPaymentMethod: any;
  paymentPhoneNumber: string;
  setPaymentPhoneNumber: any;
  setActiveStep: any;
}

const Payment = ({
  paymentMethod,
  setPaymentMethod,
  paymentPhoneNumber,
  setPaymentPhoneNumber,
  setActiveStep,
}: IPaymentProps) => {
  const validPhoneCode = ['8', '9', '2', '3'];
  const [phone, setPhone] = useState(paymentPhoneNumber);
  const handleNext = () => {
    if (paymentMethod.trim() === '') {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, 'Please choose payment method');
      return;
    }
    if (paymentMethod === PAYMENT_METHODS.MOBILE_MONEY) {
      if (phone.trim() === '') {
        toastMessage(
          TOAST_MESSAGE_TYPES.ERROR,
          'Please enter a phone number you wish to pay with',
        );
      } else if (
        !validPhoneCode.includes(phone[1]) ||
        phone[0] !== '7' ||
        phone.length !== 9
      ) {
        toastMessage(
          TOAST_MESSAGE_TYPES.ERROR,
          'Invalid phone number. please provide a valid MTN or AIRTEL-TIGO phone number.',
        );
      } else {
        setPaymentPhoneNumber(phone);
        setActiveStep(CHECKOUT_STEPS_ENUM.REVIEW);
      }
    } else {
      setActiveStep(CHECKOUT_STEPS_ENUM.REVIEW);
    }
  };
  return (
    <View
      style={[
        viewFlexSpace,
        {
          padding: 10,
          flexDirection: 'column',
          alignItems: 'flex-start',
          flex: 1,
        },
      ]}>
      <View>
        <Text style={{color: APP_COLORS.BLACK, fontSize: 20}}>
          {t('choosePaymentMethodText')}
        </Text>
        <Text style={{color: APP_COLORS.TEXT_GRAY}}>
          {t('choosePaymentMethodDescriptionText')}
        </Text>

        {paymentMethod === PAYMENT_METHODS.MOBILE_MONEY ? (
          <WhiteCard style={{marginVertical: 10, padding: 10}}>
            <View style={[viewFlexSpace, {alignItems: 'flex-start'}]}>
              <View style={{flex: 1}}>
                <Text style={{color: APP_COLORS.BLACK}}>Mobile Money</Text>
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{
                      color: APP_COLORS.TEXT_GRAY,
                      fontWeight: '600',
                      fontSize: 16,
                    }}>
                    {t('phoneNumberText')}
                  </Text>
                  <View
                    style={[
                      viewFlexSpace,
                      {
                        backgroundColor: APP_COLORS.WHITE,
                        marginTop: 5,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: APP_COLORS.DARK_GRAY,
                      },
                    ]}>
                    <Text
                      style={{
                        padding: 10,
                        borderRightColor: APP_COLORS.DARK_GRAY,
                        borderRightWidth: 1,
                      }}>
                      +250
                    </Text>
                    <TextInput
                      placeholder="Enter MOMO Phone Number"
                      style={{
                        flex: 1,
                        marginLeft: 10,
                        padding: 10,
                        color: APP_COLORS.BLACK,
                      }}
                      onChangeText={text => setPhone(text)}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
              </View>
              <Icon2 name="dot-circle-o" size={25} color={APP_COLORS.MAROON} />
            </View>
          </WhiteCard>
        ) : (
          <Pressable
            style={{marginVertical: 10}}
            onPress={() => setPaymentMethod(PAYMENT_METHODS.MOBILE_MONEY)}>
            <WhiteCard style={{padding: 10}}>
              <View style={[viewFlexSpace]}>
                <Text style={{color: APP_COLORS.BLACK}}>Mobile Money</Text>
                <Icon2 name="circle-o" size={25} color={APP_COLORS.BLACK} />
              </View>
            </WhiteCard>
          </Pressable>
        )}
        <Pressable
          style={{marginVertical: 10}}
          onPress={() => setPaymentMethod(PAYMENT_METHODS.WALLET)}>
          <WhiteCard style={{padding: 10}}>
            <View style={[viewFlexSpace]}>
              <Text style={{color: APP_COLORS.BLACK}}>{t('myWalletText')}</Text>
              {paymentMethod === PAYMENT_METHODS.WALLET ? (
                <Icon2
                  name="dot-circle-o"
                  size={25}
                  color={APP_COLORS.MAROON}
                />
              ) : (
                <Icon2 name="circle-o" size={25} color={APP_COLORS.BLACK} />
              )}
            </View>
          </WhiteCard>
        </Pressable>
      </View>
      <Pressable style={{width: '100%'}} onPress={() => handleNext()}>
        <View style={[btnWithBgContainerStyles]}>
          <Text style={[btnWithBgTextStyles, {alignItems: 'center'}]}>
            Continue
          </Text>
          <Icon name="chevron-small-right" size={30} color={APP_COLORS.WHITE} />
        </View>
      </Pressable>
    </View>
  );
};

export default Payment;
