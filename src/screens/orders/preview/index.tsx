import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {
  INavigationPropWithRouteRequired,
  IOrder,
  PAYMENT_STATUS_ENUM,
} from '../../../../interfaces';
import {APP_COLORS} from '../../../constants/colors';
import {viewFlexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/Entypo';
import Item from './item';
import {currencyFormatter} from '../../../helpers';

const OrderPreview = ({
  navigation,
  route,
}: INavigationPropWithRouteRequired) => {
  const {order} = route.params as {order: IOrder};
  const [expandProducts, setExpandProducts] = useState(false);
  return (
    <View
      style={{backgroundColor: APP_COLORS.WHITE, paddingVertical: 10, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Order ID:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>#{order.id}</Text>
        </View>
        {order.paymentStatus === PAYMENT_STATUS_ENUM.SUCCESS && (
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                borderBottomWidth: 1,
                padding: 10,
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
              Delivery Code:
            </Text>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>
              {order.deliveryCode}
            </Text>
          </View>
        )}
        <View
          style={{
            borderBottomColor: APP_COLORS.BORDER_COLOR,
            borderBottomWidth: 1,
            padding: 10,
          }}>
          <Pressable onPress={() => setExpandProducts(!expandProducts)}>
            <View style={[viewFlexSpace]}>
              <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
                {order.cartItems.length} Product Items
              </Text>
              {expandProducts ? (
                <Icon
                  name="chevron-small-up"
                  size={25}
                  color={APP_COLORS.BLACK}
                />
              ) : (
                <Icon
                  name="chevron-small-down"
                  size={25}
                  color={APP_COLORS.BLACK}
                />
              )}
            </View>
          </Pressable>
          {expandProducts && (
            <View>
              {order.cartItems.map((item, index) => (
                <Item key={index} item={item} />
              ))}
            </View>
          )}
        </View>
        <View
          style={{
            borderBottomColor: APP_COLORS.BORDER_COLOR,
            borderBottomWidth: 1,
            padding: 10,
          }}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Delivery Address:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {order.deliveryAddress.name}
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            House No: {order.deliveryAddress.houseNumber}
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {order.deliveryAddress.description}
          </Text>
        </View>
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Delivery Vehicle:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {order.deliveryVehicle.vehicleType}
          </Text>
        </View>
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Delivery Fees:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {currencyFormatter(order.deliveryFees)} RWF
          </Text>
        </View>
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Cart Total:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {currencyFormatter(order.cartTotalAmount)} RWF
          </Text>
        </View>
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Packaging Fees:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {currencyFormatter(order.packagingFees)} RWF
          </Text>
        </View>
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Charges:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {currencyFormatter(order.systemFees)} RWF
          </Text>
        </View>
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Grand Total:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {currencyFormatter(
              Number(order.cartTotalAmount) +
                Number(order.deliveryFees) +
                Number(order.packagingFees) +
                Number(order.systemFees),
            )}{' '}
            RWF
          </Text>
        </View>
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Payment Method:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {order.paymentMethod}
          </Text>
        </View>
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Payment Phone No:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {order.paymentPhoneNumber}
          </Text>
        </View>
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Payment Status:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {order.paymentStatus}
          </Text>
        </View>
        {order.paymentStatus === PAYMENT_STATUS_ENUM.SUCCESS && (
          <View
            style={[
              viewFlexSpace,
              {
                borderBottomColor: APP_COLORS.BORDER_COLOR,
                borderBottomWidth: 1,
                padding: 10,
              },
            ]}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
              Delivery Status:
            </Text>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>
              {order.deliveryStatus}
            </Text>
          </View>
        )}
        <View
          style={[
            viewFlexSpace,
            {
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            },
          ]}>
          <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
            Date:
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {new Date(order.createdAt).toUTCString()}
          </Text>
        </View>
        {order.paymentStatus === PAYMENT_STATUS_ENUM.FAILED && (
          <View
            style={{
              borderBottomColor: APP_COLORS.BORDER_COLOR,
              borderBottomWidth: 1,
              padding: 10,
            }}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
              Failure Reason:
            </Text>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>
              {order.failureReason}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OrderPreview;
