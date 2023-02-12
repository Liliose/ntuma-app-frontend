import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {APP_COLORS} from '../../../constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  btnWithoutBgContainerStyles,
  btnWithoutBgTextStyles,
  viewFlexCenter,
} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CartItem from './cart-item';
import {currencyFormatter} from '../../../helpers';

const Cart = () => {
  const {cart} = useSelector((state: RootState) => state.cart);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    let sm = 0;
    for (let i = 0; i < cart.length; i++) {
      sm += cart[i].quantity * cart[i].price;
    }
    setTotal(sm);
  }, [cart]);
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.GRAY_BG}}>
      {cart.length > 0 ? (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{marginTop: 10, flex: 1}}>
            <ScrollView>
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              backgroundColor: APP_COLORS.WHITE,
              padding: 20,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <Text
              style={{
                color: APP_COLORS.BLACK,
                marginBottom: 10,
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 16,
              }}>
              TOTAL: {currencyFormatter(total)} RWF
            </Text>
            <View style={[btnWithBgContainerStyles, {marginBottom: 10}]}>
              <Text style={[btnWithBgTextStyles, {fontWeight: '700'}]}>
                Checkout
              </Text>
            </View>
            <View style={[btnWithoutBgContainerStyles]}>
              <Text
                style={[
                  btnWithoutBgTextStyles,
                  {color: APP_COLORS.MAROON, fontWeight: '700'},
                ]}>
                Schedule Order
              </Text>
            </View>
          </View>
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
