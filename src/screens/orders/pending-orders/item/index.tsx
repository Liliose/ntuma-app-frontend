import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import WhiteCard from '../../../../components/white-card';
import {viewFlexSpace} from '../../../../constants/styles';
import {INavigationProp, IOrder, IProduct} from '../../../../../interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../reducers';
import {app} from '../../../../constants/app';
import {APP_COLORS} from '../../../../constants/colors';
import {currencyFormatter} from '../../../../helpers';
interface IItemProps extends INavigationProp {
  item: IOrder;
}
const Item = ({item, navigation}: IItemProps) => {
  const {products} = useSelector((state: RootState) => state.products);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  useEffect(() => {
    if (item.cartItems.length > 0) {
      const prod = products.find(i => i.pId === item.cartItems[0].productId);
      if (prod) {
        setProduct(prod);
      }
    }
  }, [item]);
  return (
    <Pressable
      onPress={() => navigation.navigate('OrderPreview', {order: item})}>
      <WhiteCard style={{marginBottom: 10}}>
        <View style={[viewFlexSpace]}>
          <View>
            <Image
              source={{uri: app.FILE_URL + product?.image}}
              style={{width: 100, height: 100}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 1, padding: 10}}>
            <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
              {product?.name}
            </Text>
            <View style={[viewFlexSpace, {alignItems: 'flex-start'}]}>
              <View>
                <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                  {item.cartItems.length} Items
                </Text>
                <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                  {currencyFormatter(
                    Number(item.cartTotalAmount) + Number(item.deliveryFees),
                  )}{' '}
                  RWF
                </Text>
              </View>
              <Text style={{color: APP_COLORS.TEXT_GRAY, width: '50%'}}>
                {new Date(item.createdAt).toUTCString()}
              </Text>
            </View>
          </View>
        </View>
      </WhiteCard>
    </Pressable>
  );
};

export default Item;
