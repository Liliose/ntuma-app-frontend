import {View, Text, ScrollView, Pressable} from 'react-native';
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
import ProductPreview from '../products-tabs/preview';
import {ICartItem, INavigationProp, IProduct} from '../../../../interfaces';
import NotFound from '../../../components/not-found';

const Cart = ({navigation}: INavigationProp) => {
  const {cart} = useSelector((state: RootState) => state.cart);
  const [total, setTotal] = useState<number>(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );
  const [selectedCartItem, setSelectedCartItem] = useState<
    ICartItem | undefined
  >(undefined);

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
                <CartItem
                  key={index}
                  item={item}
                  setSelectedCartItem={setSelectedCartItem}
                  setSelectedProduct={setSelectedProduct}
                  setShowModal={setShowModal}
                />
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
              SUB TOTAL: {currencyFormatter(total)} RWF
            </Text>
            <Pressable
              style={{marginBottom: 10}}
              onPress={() => navigation.navigate('Checkout')}>
              <View style={[btnWithBgContainerStyles]}>
                <Text style={[btnWithBgTextStyles, {fontWeight: '700'}]}>
                  Checkout
                </Text>
              </View>
            </Pressable>
            {/* <View style={[btnWithoutBgContainerStyles]}>
              <Text
                style={[
                  btnWithoutBgTextStyles,
                  {color: APP_COLORS.MAROON, fontWeight: '700'},
                ]}>
                Schedule Order
              </Text>
            </View> */}
          </View>
        </View>
      ) : (
        <NotFound title="Your cart is empty" />
      )}
      <ProductPreview
        showModal={showModal}
        setShowModal={setShowModal}
        product={selectedProduct}
        navigation={navigation}
        selectedCartItem={selectedCartItem}
      />
    </View>
  );
};

export default Cart;
