import {View, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {APP_COLORS} from '../../constants/colors';
import {viewFlexCenter, viewFlexSpace} from '../../constants/styles';
import CheckedCircle from '../../components/checked-circle';
import Delivery from './delivery';
import Payment from './payment';
import Review from './review';
import {IDeliveryFee, ILocation, INavigationProp} from '../../../interfaces';
import {
  calCulateDistance,
  errorHandler,
  returnErroMessage,
  setHeaders,
} from '../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import axios from 'axios';
import {app} from '../../constants/app';
import FullPageLoader from '../../components/full-page-loader';
import {resetCart} from '../../actions/cart';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import CustomAlert from '../../components/custom-alert';
import FastImage from 'react-native-fast-image';
import {fetchSystemFees} from '../../actions/systemFees';
import {fethcPackagingFees} from '../../actions/packagingFees';

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
  const systemfees = useSelector((state: RootState) => state.systemfees);
  const packagingfees = useSelector((state: RootState) => state.packagingfees);
  const [activeStep, setActiveStep] = useState(CHECKOUT_STEPS_ENUM.DELIVERY);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentPhoneNumber, setPaymentPhoneNumber] = useState<string>('');
  const [deliveryAmount, setDeliveryAmount] = useState<number>(0);

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [vehicle, setVehicle] = useState<IDeliveryFee>({
    id: 0,
    vehicleType: '',
    amountPerKilometer: 0,
    defaultPrice: 0,
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
  const [generalTotal, setGeneralTotal] = useState<number>(0);
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
    let sub = true;
    if (sub) {
      let sm = 0;
      for (let i = 0; i < cart.length; i++) {
        sm += cart[i].quantity * cart[i].price;
      }
      setCartTotal(sm);
    }
    return () => {
      sub = false;
    };
  }, [cart]);

  useEffect(() => {
    if (vehicle.vehicleType.trim() !== '') {
      if (distance < 5) {
        //default kilometer
        setDeliveryAmount(vehicle.defaultPrice);
      } else {
        setDeliveryAmount(vehicle.amountPerKilometer * distance);
      }
    } else {
      setDeliveryAmount(0);
    }
  }, [vehicle, distance]);

  useEffect(() => {
    dispatch(fetchSystemFees());
    dispatch(fethcPackagingFees());
  }, []);

  useEffect(() => {
    let sub = true;
    if (sub) {
      setGeneralTotal(
        Number(cartTotal) +
          Number(deliveryAmount) +
          Number(packagingfees.fees.amount) +
          Number(systemfees.fees.amount),
      );
    }
    return () => {
      sub = false;
    };
  }, [deliveryAmount, packagingfees, systemfees, deliveryAmount, cartTotal]);

  const handleSubmit = () => {
    setShowAlert(false);
    setIsLoading(true);
    axios
      .post(
        app.BACKEND_URL + '/orders/',
        {
          systemfees: systemfees.fees.amount,
          packagingfees: packagingfees.fees.amount,
          cartItems: JSON.stringify(cart),
          cartTotalAmount: cartTotal,
          distance,
          vehicle: JSON.stringify(vehicle),
          deliveryFees: deliveryAmount,
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
        const err = returnErroMessage(error);
        setIsLoading(false);
        setErrorMessage(err);
        setShowAlert(true);
        // errorHandler(error);
        // if (!error.message.includes('Network')) {
        //   dispatch(resetCart());
        //   navigation.replace('Orders');
        // }
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
          deliveryAmount={deliveryAmount}
          handleSubmit={handleSubmit}
          packagingfees={packagingfees}
          systemfees={systemfees}
        />
      )}
      <CustomAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        confirmationTitle="Try Again"
        callBack={handleSubmit}>
        <View style={[viewFlexCenter]}>
          <FastImage
            source={require('../../assets/error-black.gif')}
            style={{width: 120, height: 120}}
          />
          <Text
            style={{
              color: APP_COLORS.MAROON,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Something Went Wrong
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>{errorMessage}</Text>
        </View>
      </CustomAlert>
      <FullPageLoader isLoading={isLoading} />
    </View>
  );
};

export default Checkout;
