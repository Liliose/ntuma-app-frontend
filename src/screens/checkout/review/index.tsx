import {View, Text, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {
  IAgentsFeesReducer,
  IDeliveryFee,
  ILocation,
  IMarket,
  IPackagingFeesReducer,
  ISystemFeesReducer,
} from '../../../../interfaces';
import {APP_COLORS} from '../../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  viewFlexSpace,
} from '../../../constants/styles';
import {currencyFormatter} from '../../../helpers';
import {t} from 'i18next';
interface IReviewProps {
  distance: number;
  paymentMethod: string;
  vehicle: IDeliveryFee;
  address: ILocation;
  paymentPhoneNumber: string;
  cartTotal: number;
  market: IMarket | undefined;
  deliveryAmount: number;
  handleSubmit: any;
  systemfees: ISystemFeesReducer;
  packagingfees: IPackagingFeesReducer;
  agentsfees: IAgentsFeesReducer;
  generalTotal: number;
}
const Review = ({
  distance,
  paymentMethod,
  vehicle,
  address,
  paymentPhoneNumber,
  cartTotal,
  market,
  deliveryAmount,
  handleSubmit,
  packagingfees,
  systemfees,
  agentsfees,
  generalTotal,
}: IReviewProps) => {
  return (
    <View
      style={[
        viewFlexSpace,
        {
          paddingVertical: 10,
          flexDirection: 'column',
          alignItems: 'flex-start',
          flex: 1,
        },
      ]}>
      <View style={{width: '100%'}}>
        <ScrollView>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: APP_COLORS.BLACK,
              padding: 10,
            }}>
            {t('ordeReviewText')}
          </Text>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomWidth: 1,
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                padding: 10,
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: 'bold'}}>
              Market:
            </Text>
            <Text style={{color: APP_COLORS.BLACK}}>{market?.name}</Text>
          </View>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomWidth: 1,
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                padding: 10,
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: 'bold'}}>
              Cart Subtotal:
            </Text>
            <Text style={{color: APP_COLORS.BLACK}}>
              {currencyFormatter(cartTotal)} RWF
            </Text>
          </View>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomWidth: 1,
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                padding: 10,
                alignItems: 'flex-start',
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: 'bold'}}>
              Delivery Address:
            </Text>
            <Text
              style={{
                color: APP_COLORS.BLACK,
                flex: 1,
                marginLeft: 10,
                textAlign: 'right',
              }}>
              {address.name}
            </Text>
          </View>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomWidth: 1,
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                padding: 10,
                alignItems: 'flex-start',
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: 'bold'}}>
              Delivery Vehicle:
            </Text>
            <Text
              style={{
                color: APP_COLORS.BLACK,
                flex: 1,
                marginLeft: 10,
                textAlign: 'right',
              }}>
              {vehicle.vehicleType}
            </Text>
          </View>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomWidth: 1,
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                padding: 10,
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: 'bold'}}>
              Delivery Fees:
            </Text>
            <Text style={{color: APP_COLORS.BLACK}}>{distance}km</Text>
            <Text style={{color: APP_COLORS.BLACK}}>
              {currencyFormatter(deliveryAmount)} RWF
            </Text>
          </View>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomWidth: 1,
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                padding: 10,
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: 'bold'}}>
              Packaging Fees:
            </Text>
            <Text style={{color: APP_COLORS.BLACK}}>
              {currencyFormatter(packagingfees.fees.amount)} RWF
            </Text>
          </View>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomWidth: 1,
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                padding: 10,
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: 'bold'}}>
              Charges:
            </Text>
            <Text style={{color: APP_COLORS.BLACK}}>
              {currencyFormatter(
                Number(systemfees.fees.amount) + Number(agentsfees.fees.amount),
              )}{' '}
              RWF
            </Text>
          </View>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomWidth: 1,
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                padding: 10,
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: 'bold'}}>
              Payment Method:
            </Text>
            <Text style={{color: APP_COLORS.BLACK}}>{paymentMethod}</Text>
          </View>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomWidth: 1,
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                padding: 10,
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: 'bold'}}>
              Payment Phone Number:
            </Text>
            <Text style={{color: APP_COLORS.BLACK}}>
              250{paymentPhoneNumber}
            </Text>
          </View>
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomWidth: 1,
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                padding: 10,
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: 'bold'}}>
              Total:
            </Text>
            <Text style={{color: APP_COLORS.BLACK}}>
              {currencyFormatter(generalTotal)} RWF
            </Text>
          </View>
        </ScrollView>
      </View>
      <Pressable style={{width: '100%'}} onPress={() => handleSubmit()}>
        <View style={[btnWithBgContainerStyles, {marginHorizontal: 10}]}>
          <Text style={[btnWithBgTextStyles, {alignItems: 'center'}]}>
            {t('submitOrderText')}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Review;
