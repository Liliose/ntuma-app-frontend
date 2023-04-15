import {View, Text, Pressable, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {APP_COLORS} from '../../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  commonInput,
  viewFlexSpace,
} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {
  IDeliveryFee,
  INavigationProp,
  TOAST_MESSAGE_TYPES,
  VEHICLES_ENUM,
} from '../../../../interfaces';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {toastMessage} from '../../../helpers';
import {CHECKOUT_STEPS_ENUM} from '..';
import {t} from 'i18next';

const {width} = Dimensions.get('window');

interface IDeliverProps extends INavigationProp {
  vehicle: IDeliveryFee;
  setVehicle: any;
  address: any;
  setAddress: any;
  setActiveStep: any;
  distance: number;
}
const Delivery = ({
  vehicle,
  setVehicle,
  address,
  setAddress,
  setActiveStep,
  navigation,
  distance,
}: IDeliverProps) => {
  const {locations} = useSelector((state: RootState) => state.locations);
  const {fees} = useSelector((state: RootState) => state.deliveryFees);
  const {selectedMarket} = useSelector((state: RootState) => state.markets);
  const [vehiclesToChooseFrom, setVehiclesToChoosefrom] = useState<
    {
      value: any;
      label: string;
      icon: any;
      itemKey: number;
    }[]
  >([]);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (
        distance > (selectedMarket?.bikeMaximumKm as number) ||
        selectedMarket?.bikeMaximumKm === 0
      ) {
        const veh = fees.filter(
          item => item.vehicleType !== VEHICLES_ENUM.BIKE,
        );
        const vehicles = veh.map((item, position) => {
          return {
            value: item,
            label: item.vehicleType,
            icon: () => <Icon name="chevron-small-right" />,
            itemKey: position,
            key: position,
          };
        });
        setVehiclesToChoosefrom(vehicles);
      } else {
        const vehicles = fees.map((item, position) => {
          return {
            value: item,
            label: item.vehicleType,
            icon: () => ReturnIcon(item.vehicleType),
            itemKey: position,
            key: position,
          };
        });
        setVehiclesToChoosefrom(vehicles);
      }
    }
    return () => {
      sub = false;
    };
  }, [fees]);

  const ReturnIcon = (icon: string) => {
    if (icon === VEHICLES_ENUM.CAR) {
      return <Icon2 name="car" size={25} color={APP_COLORS.BLACK} />;
    }
    if (icon === VEHICLES_ENUM.MOTORCYCLE) {
      return <Icon2 name="motorcycle" size={25} color={APP_COLORS.BLACK} />;
    }
    if (icon === VEHICLES_ENUM.BIKE) {
      return <Icon3 name="bike" size={25} color={APP_COLORS.BLACK} />;
    }
    return <></>;
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
          {t('chooseDeliveryAddressText')}
        </Text>
        <Text style={{color: APP_COLORS.TEXT_GRAY}}>
          {t('chooseDeliveryAddressDescriptionText')}
        </Text>
        <View>
          <Picker
            selectedValue={address}
            onValueChange={(itemValue, itemIndex) => {
              setAddress(itemValue);
            }}
            style={[commonInput]}>
            {[
              {name: t('chooseDeliveryAddressText'), data: {}, details: {}},
              ...locations,
            ].map((vehicles, i) => (
              <Picker.Item key={i} label={vehicles.name} value={vehicles} />
            ))}
          </Picker>
        </View>
        <View style={{marginHorizontal: 15, marginVertical: 10}}>
          <Pressable onPress={() => navigation.navigate('Locations')}>
            <View style={[viewFlexSpace]}>
              <Icon4 name="gear" size={20} color={APP_COLORS.MAROON} />
              <Text style={{color: APP_COLORS.MAROON, flex: 1, marginLeft: 10}}>
                {t('manageAddressText')}
              </Text>
            </View>
          </Pressable>
        </View>
        <View>
          <DropDownPicker
            open={open}
            value={vehicle}
            items={vehiclesToChooseFrom}
            setOpen={setOpen}
            setValue={setVehicle}
            // setItems={setVehiclesToChoosefrom}
            style={[commonInput, {width: width - 20}]}
            itemKey="1"
            placeholder={t('chooseDeliveryVehicleText') as string}
          />
        </View>
      </View>
      <Pressable style={{width: '100%'}} onPress={() => handleNext()}>
        <View style={[btnWithBgContainerStyles]}>
          <Text style={[btnWithBgTextStyles, {alignItems: 'center'}]}>
            {t('continueText')}
          </Text>
          <Icon name="chevron-small-right" size={30} color={APP_COLORS.WHITE} />
        </View>
      </Pressable>
    </View>
  );
};

export default Delivery;
