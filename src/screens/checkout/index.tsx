import {View, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {APP_COLORS} from '../../constants/colors';
import {viewFlexSpace} from '../../constants/styles';
import CheckedCircle from '../../components/checked-circle';
import Delivery from './delivery';
import Payment from './payment';
import Review from './review';
import {IDeliveryFee, ILocation, INavigationProp} from '../../../interfaces';
import {calCulateDistance, errorHandler, setHeaders} from '../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import axios from 'axios';
import {app} from '../../constants/app';
import FullPageLoader from '../../components/full-page-loader';
import {resetCart} from '../../actions/cart';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

export enum CHECKOUT_STEPS_ENUM {
  DELIVERY = 'DELIVERY',
  PAYMENT = 'PAYMENT',
  REVIEW = 'REVIEW',
}
export enum PAYMENT_METHODS {
  MOBILE_MONEY = 'MOBILE_MONEY',
  WALLET = 'WALLET',
}
const Checkout = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state: RootState) => state.user);
  const {selectedMarket} = useSelector((state: RootState) => state.markets);
  const {cart} = useSelector((state: RootState) => state.cart);
  const [activeStep, setActiveStep] = useState(CHECKOUT_STEPS_ENUM.DELIVERY);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentPhoneNumber, setPaymentPhoneNumber] = useState<string>('');
  const [vehicle, setVehicle] = useState<IDeliveryFee>({
    id: 0,
    vehicleType: '',
    amountPerKilometer: 0,
  });
  const [address, setAddress] = useState<ILocation>({
    name: '',
    data: {},
    details: {},
    houseNumber: '',
    description: '',
  });
  const [distance, setDistance] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const isStepComplete = (step: string) => {
    if (step === CHECKOUT_STEPS_ENUM.DELIVERY) {
      if (
        address.name &&
        address.name.trim() !== '' &&
        vehicle.vehicleType.trim() !== '' &&
        vehicle.vehicleType.trim() !== 'Choose vehicle type'
      ) {
        return true;
      }
      return false;
    }

    if (step === CHECKOUT_STEPS_ENUM.PAYMENT) {
      if (paymentMethod.trim() !== '') {
        if (
          paymentMethod === PAYMENT_METHODS.MOBILE_MONEY &&
          paymentPhoneNumber.trim() !== ''
        ) {
          return true;
        }
        if (paymentMethod === PAYMENT_METHODS.WALLET) return true;
      }
      return false;
    }

    return false;
  };

  useEffect(() => {
    if (address.name.trim() !== '') {
      if (address.details) {
        if (address.details?.geometry?.location) {
          const {lat, lng} = address.details.geometry.location;
          const dist = calCulateDistance(
            Number(selectedMarket?.lat),
            Number(selectedMarket?.long),
            lat,
            lng,
          );
          if (dist > 0) {
            setDistance(Number(dist.toFixed(1)));
          } else {
            setDistance(1);
          }
          console.log('Distance ', dist.toFixed(1));
        } else {
          setDistance(0);
        }
      } else {
        setDistance(0);
      }
    } else {
      setDistance(0);
    }
  }, [address]);

  useEffect(() => {
    let sm = 0;
    for (let i = 0; i < cart.length; i++) {
      sm += cart[i].quantity * cart[i].price;
    }
    setCartTotal(sm);
  }, [cart]);

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post(
        app.BACKEND_URL + '/orders/',
        {
          cartItems: JSON.stringify(cart),
          cartTotalAmount: cartTotal,
          distance,
          vehicle: JSON.stringify(vehicle),
          deliveryFees: distance * vehicle.amountPerKilometer,
          deliveryAddress: JSON.stringify(address),
          paymentMethod,
          paymentPhoneNumber: '250' + paymentPhoneNumber,
          marketId: selectedMarket?.mId,
        },
        setHeaders(token),
      )
      .then(res => {
        setIsLoading(false);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: res.data.msg,
          button: 'OK',
          onHide: () => {
            dispatch(resetCart());
            navigation.replace('Orders');
          },
        });
      })
      .catch(error => {
        setIsLoading(false);
        errorHandler(error);
        if (!error.message.includes('Network')) {
          dispatch(resetCart());
          navigation.replace('Orders');
        }
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE}}>
      <View
        style={[
          viewFlexSpace,
          {padding: 10, backgroundColor: APP_COLORS.GRAY_BG},
        ]}>
        <Pressable onPress={() => setActiveStep(CHECKOUT_STEPS_ENUM.DELIVERY)}>
          <View style={[viewFlexSpace]}>
            <CheckedCircle
              countNumber={1}
              isChecked={isStepComplete(CHECKOUT_STEPS_ENUM.DELIVERY)}
            />
            <Text
              style={{
                color: APP_COLORS.BLACK,
                fontSize: 16,
                fontWeight: '600',
              }}>
              Delivery
            </Text>
          </View>
        </Pressable>
        <View>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>------</Text>
        </View>
        <Pressable
          onPress={() => setActiveStep(CHECKOUT_STEPS_ENUM.PAYMENT)}
          disabled={activeStep === CHECKOUT_STEPS_ENUM.DELIVERY}>
          <View style={[viewFlexSpace]}>
            <CheckedCircle
              countNumber={2}
              isChecked={isStepComplete(CHECKOUT_STEPS_ENUM.PAYMENT)}
            />
            <Text
              style={{
                color: APP_COLORS.BLACK,
                fontSize: 16,
                fontWeight: '600',
              }}>
              Payment
            </Text>
          </View>
        </Pressable>
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
      {activeStep === CHECKOUT_STEPS_ENUM.PAYMENT && (
        <Payment
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          paymentPhoneNumber={paymentPhoneNumber}
          setPaymentPhoneNumber={setPaymentPhoneNumber}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === CHECKOUT_STEPS_ENUM.REVIEW && (
        <Review
          paymentMethod={paymentMethod}
          address={address}
          vehicle={vehicle}
          distance={distance}
          paymentPhoneNumber={paymentPhoneNumber}
          cartTotal={cartTotal}
          market={selectedMarket}
          handleSubmit={handleSubmit}
        />
      )}
      <FullPageLoader isLoading={isLoading} />
    </View>
  );
};

export default Checkout;
