import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import WhiteCard from '../../../../components/white-card';
import {viewFlexSpace} from '../../../../constants/styles';
import {
  ICartItem,
  INavigationProp,
  IOrder,
  IProduct,
} from '../../../../../interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../reducers';
import {app} from '../../../../constants/app';
import {APP_COLORS} from '../../../../constants/colors';
import {currencyFormatter} from '../../../../helpers';
interface IItemProps {
  item: ICartItem;
}
const Item = ({item}: IItemProps) => {
  const {products} = useSelector((state: RootState) => state.products);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  useEffect(() => {
    if (item) {
      const prod = products.find(i => i.pId === item.productId);
      if (prod) {
        setProduct(prod);
      }
    }
  }, [item]);
  return (
    <View style={[viewFlexSpace, {alignItems: 'flex-start'}]}>
      <View>
        <Image
          source={{uri: app.FILE_URL + product?.image}}
          style={{width: 50, height: 50, borderRadius: 100}}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 1, padding: 10}}>
        <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
          {product?.name}
        </Text>
        <View>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {item.quantity} x {currencyFormatter(item.price)} ={' '}
            {currencyFormatter(item.quantity * item.price)} RWF
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Item;
