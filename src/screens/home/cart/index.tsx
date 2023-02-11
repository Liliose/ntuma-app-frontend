import {View, Text} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../../constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {viewFlexCenter} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CartItem from './cart-item';

const Cart = () => {
  const {cart} = useSelector((state: RootState) => state.cart);
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.GRAY_BG}}>
      {cart.length > 0 ? (
        <View style={{marginTop: 10}}>
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </View>
      ) : (
        <View style={[viewFlexCenter, {flex: 1}]}>
          <Icon name="sad-tear" size={50} color={APP_COLORS.MAROON} />
          <Text style={{marginTop: 10, color: APP_COLORS.MAROON}}>
            Your cart is empty
          </Text>
        </View>
      )}
    </View>
  );
};

export default Cart;
