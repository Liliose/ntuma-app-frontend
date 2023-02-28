import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import WhiteCard from '../../../../components/white-card';
import {
  IDishProduct,
  INavigationProp,
  IProduct,
} from '../../../../../interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../reducers';
import {viewFlexSpace} from '../../../../constants/styles';
import {app} from '../../../../constants/app';
import {APP_COLORS} from '../../../../constants/colors';
import {currencyFormatter} from '../../../../helpers';
interface IDishProductItemProps extends INavigationProp {
  dishProduct: IDishProduct;
}
const DishProductItem = ({navigation, dishProduct}: IDishProductItemProps) => {
  const {products} = useSelector((state: RootState) => state.products);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  useEffect(() => {
    let r: boolean = true;
    if (r) {
      const prod = products.find(item => item.pId === dishProduct.productId);
      if (prod) {
        setProduct(prod);
      }
    }
    return () => {
      r = false;
    };
  }, [dishProduct]);

  return (
    <View style={{marginVertical: 10}}>
      <WhiteCard style={{padding: 10}}>
        <View style={[viewFlexSpace]}>
          <Image
            source={{uri: app.FILE_URL + product?.image}}
            style={{width: 50, height: 50, borderRadius: 100}}
            resizeMode="contain"
          />
          <View style={{flex: 1, marginHorizontal: 10}}>
            <Text style={{color: APP_COLORS.BLACK}}>{product?.name}</Text>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>
              {currencyFormatter(product?.singlePrice)} Rwf
            </Text>
          </View>
        </View>
      </WhiteCard>
    </View>
  );
};

export default DishProductItem;
