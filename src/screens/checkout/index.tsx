import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {APP_COLORS} from '../../constants/colors';
import {viewFlexSpace} from '../../constants/styles';
import CheckedCircle from '../../components/checked-circle';
import Delivery from './delivery';
import Payment from './payment';
import Review from './review';
import {ILocation, INavigationProp} from '../../../interfaces';

export enum CHECKOUT_STEPS_ENUM {
  DELIVERY = 'DELIVERY',
  PAYMENT = 'PAYMENT',
  REVIEW = 'REVIEW',
}
const Checkout = ({navigation}: INavigationProp) => {
  const [activeStep, setActiveStep] = useState(CHECKOUT_STEPS_ENUM.DELIVERY);
  const [vehicle, setVehicle] = useState('');
  const [address, setAddress] = useState<ILocation>({name: '', data: ''});

  const isStepComplete = (step: string) => {
    if (step === CHECKOUT_STEPS_ENUM.DELIVERY) {
      if (address.name && address.name.trim() !== '' && vehicle.trim() !== '') {
        return true;
      }
      return false;
    }

    return false;
  };
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE}}>
      <View
        style={[
          viewFlexSpace,
          {padding: 10, backgroundColor: APP_COLORS.GRAY_BG},
        ]}>
        <View style={[viewFlexSpace]}>
          <CheckedCircle
            countNumber={1}
            isChecked={isStepComplete(CHECKOUT_STEPS_ENUM.DELIVERY)}
          />
          <Text
            style={{color: APP_COLORS.BLACK, fontSize: 16, fontWeight: '600'}}>
            Delivery
          </Text>
        </View>
        <View>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>------</Text>
        </View>
        <View style={[viewFlexSpace]}>
          <CheckedCircle countNumber={2} isChecked={false} />
          <Text
            style={{color: APP_COLORS.BLACK, fontSize: 16, fontWeight: '600'}}>
            Payment
          </Text>
        </View>
        <View>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>------</Text>
        </View>
        <View style={[viewFlexSpace]}>
          <CheckedCircle countNumber={3} isChecked={false} />
          <Text
            style={{color: APP_COLORS.BLACK, fontSize: 16, fontWeight: '600'}}>
            Review
          </Text>
        </View>
      </View>
      {activeStep === CHECKOUT_STEPS_ENUM.DELIVERY && (
        <Delivery
          address={address}
          setAddress={setAddress}
          vehicle={vehicle}
          setVehicle={setVehicle}
          navigation={navigation}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === CHECKOUT_STEPS_ENUM.PAYMENT && <Payment />}
      {activeStep === CHECKOUT_STEPS_ENUM.REVIEW && <Review />}
    </View>
  );
};

export default Checkout;
