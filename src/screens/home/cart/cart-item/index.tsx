import {View, Text, Image, Pressable, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ICartItem, IProduct} from '../../../../../interfaces';
import WhiteCard from '../../../../components/white-card';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../reducers';
import {APP_COLORS} from '../../../../constants/colors';
import {viewFlexSpace} from '../../../../constants/styles';
import {app} from '../../../../constants/app';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import {currencyFormatter} from '../../../../helpers';
import {setCart} from '../../../../actions/cart';
interface ICartItemProps {
  item: ICartItem;
  setSelectedCartItem: any;
  setSelectedProduct: any;
  setShowModal: any;
}
const CartItem = ({
  item,
  setShowModal,
  setSelectedCartItem,
  setSelectedProduct,
}: ICartItemProps) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const {products} = useSelector((state: RootState) => state.products);
  const {cart} = useSelector((state: RootState) => state.cart);
  useEffect(() => {
    const pr = products.find(i => i.pId === item.productId);
    if (pr) {
      setProduct(pr);
    }
  }, [item]);

  const handleDelete = () => {
    Alert.alert(
      'Confirm the process',
      'Do you want to remove this product from cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'confirm',
          onPress: () => {
            dispatch(setCart(cart.filter(i => i.productId !== item.productId)));
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <>
      {product !== undefined && (
        <WhiteCard
          style={{marginHorizontal: 10, marginVertical: 5, padding: 10}}>
          <View style={[viewFlexSpace, {alignItems: 'flex-start'}]}>
            <Pressable
              onPress={() => {
                setSelectedCartItem(item);
                setSelectedProduct(product);
                setShowModal(true);
              }}>
              <Image
                source={{uri: app.FILE_URL + product.image}}
                style={{width: 70, height: 70, borderRadius: 100}}
                resizeMode="contain"
              />
            </Pressable>
            <View style={{flex: 1, marginLeft: 10}}>
              <View style={[viewFlexSpace, {alignItems: 'flex-start'}]}>
                <Text
                  style={{
                    color: APP_COLORS.BLACK,
                    fontSize: 20,
                    flex: 1,
                    marginRight: 5,
                  }}>
                  {product.name}
                </Text>
                <Pressable onPress={() => handleDelete()}>
                  <View>
                    <Icon name="close" size={25} color={APP_COLORS.BLACK} />
                  </View>
                </Pressable>
              </View>
              <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                {product.description}
              </Text>
              <View style={[viewFlexSpace]}>
                <View>
                  <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                    {currencyFormatter(item.price)} RWF x {item.quantity}{' '}
                  </Text>
                  <Text style={{color: APP_COLORS.BLACK}}>
                    TOTAL : {currencyFormatter(item.price * item.quantity)} RWF
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    setSelectedCartItem(item);
                    setSelectedProduct(product);
                    setShowModal(true);
                  }}>
                  <View>
                    <Icon2 name="edit-2" size={25} color={APP_COLORS.BLACK} />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </WhiteCard>
      )}
    </>
  );
};

export default CartItem;
