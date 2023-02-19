import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  commonInput,
  viewFlexSpace,
} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {
  IDeliveryFee,
  INavigationProp,
  TOAST_MESSAGE_TYPES,
  VEHICLES_ENUM,
} from '../../../../interfaces';
import {Picker} from '@react-native-picker/picker';
import {toastMessage} from '../../../helpers';
import {CHECKOUT_STEPS_ENUM} from '..';

interface IDeliverProps extends INavigationProp {
  vehicle: IDeliveryFee;
  setVehicle: any;
  address: any;
  setAddress: any;
  setActiveStep: any;
}
const Delivery = ({
  vehicle,
  setVehicle,
  address,
  setAddress,
  setActiveStep,
  navigation,
}: IDeliverProps) => {
  const {locations} = useSelector((state: RootState) => state.locations);
  const {fees} = useSelector((state: RootState) => state.deliveryFees);

  const handleNext = () => {
    if (address.name === undefined) {
      toastMessage(TOAST_MESSAGE_TYPES.INFO, 'Please select delivery address');
      return;
    }
    if (address.name.trim() === '') {
      toastMessage(TOAST_MESSAGE_TYPES.INFO, 'Please select delivery address');
      return;
    }
    if (
      vehicle.vehicleType.trim() === '' ||
      vehicle.vehicleType.trim() === 'Choose vehicle type'
    ) {
      toastMessage(TOAST_MESSAGE_TYPES.INFO, 'Please select vehicle type');
      return;
    }
    setActiveStep(CHECKOUT_STEPS_ENUM.PAYMENT);
  };

  return (
    <View
      style={[
        viewFlexSpace,
        {
          flex: 1,
          padding: 10,
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      ]}>
      <View>
        <Text style={{color: APP_COLORS.BLACK, fontSize: 20}}>
          Choose Delivery Address
        </Text>
        <Text style={{color: APP_COLORS.TEXT_GRAY}}>
          Choose address from which we will deliver this order to you.To manage
          your addresses, go to your profile and click saved locations.
        </Text>
        <View>
          <Picker
            selectedValue={address}
            onValueChange={(itemValue, itemIndex) => {
              setAddress(itemValue);
            }}
            style={[commonInput]}>
            {[
              {name: 'Choose address', data: {}, details: {}},
              ...locations,
            ].map((vehicles, i) => (
              <Picker.Item key={i} label={vehicles.name} value={vehicles} />
            ))}
          </Picker>
        </View>
        <View style={{marginHorizontal: 15}}>
          <Pressable onPress={() => navigation.navigate('Locations')}>
            <Text style={{color: APP_COLORS.MAROON}}>Manage addresses</Text>
          </Pressable>
        </View>
        <View>
          <Picker
            selectedValue={vehicle}
            onValueChange={(itemValue, itemIndex) => {
              setVehicle(itemValue);
            }}
            style={[commonInput]}>
            {[
              {
                vehicleType: 'Choose vehicle type',
                amountPerKilometer: 0,
                id: 0,
              },
              ...fees,
            ].map((fees, i) => (
              <Picker.Item key={i} label={fees.vehicleType} value={fees} />
            ))}
          </Picker>
        </View>
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

export default Delivery;
