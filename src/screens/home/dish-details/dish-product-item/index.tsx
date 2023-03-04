import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import WhiteCard from '../../../../components/white-card';
import {
  ICartItem,
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
import Icon from 'react-native-vector-icons/Entypo';
interface IDishProductItemProps extends INavigationProp {
  dishProduct: IDishProduct;
  handleProductPriceChange: any;
  setSelectedProduct: any;
  setShowModal: any;
}

const initialPrice: ICartItem = {
  price: 0,
  ppId: 0,
  productId: 0,
  priceType: '' as any,
  customPrice: false,
  quantity: 1,
};
const DishProductItem = ({
  navigation,
  dishProduct,
  handleProductPriceChange,
  setShowModal,
  setSelectedProduct,
}: IDishProductItemProps) => {
  const {products} = useSelector((state: RootState) => state.products);
  const {prices} = useSelector((state: RootState) => state.productPrices);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [price, setPrice] = useState<ICartItem>(initialPrice);
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

  useEffect(() => {
    if (product?.priceType === 'single') {
      setPrice({
        ...initialPrice,
        productId: product?.pId as number,
        priceType: product?.priceType as string,
        price: product?.priceType === 'single' ? product.singlePrice : 0,
      });
    } else {
      const allPrices = prices.filter(item => item.productId === product?.pId);
      if (allPrices.length > 0) {
        //get small price
        const smallPrice = allPrices.reduce((min, current) => {
          return current.amount < min.amount ? current : min;
        });
        //get small price
        setPrice({
          ...initialPrice,
          productId: product?.pId as number,
          priceType: product?.priceType as string,
          price: smallPrice.amount,
          ppId: smallPrice.ppId,
        });
      }
    }
  }, [product]);

  const handlePlus = () => {
    setPrice({...price, quantity: price.quantity + 1});
  };
  const handleMinus = () => {
    if (price.quantity - 1 >= 0) {
      setPrice({...price, quantity: price.quantity - 1});
    } else {
      setPrice({...price, quantity: 0});
    }
  };

  useEffect(() => {
    handleProductPriceChange(price);
  }, [price]);

  return (
    <View style={{marginVertical: 10}}>
      <WhiteCard style={{padding: 10}}>
        <View style={[viewFlexSpace]}>
          <Pressable
            onPress={() => {
              setSelectedProduct(product);
              setShowModal(true);
            }}>
            <Image
              source={{uri: app.FILE_URL + product?.image}}
              style={{width: 50, height: 50, borderRadius: 100}}
              resizeMode="contain"
            />
          </Pressable>
          <View style={{flex: 1, marginHorizontal: 10}}>
            <Text style={{color: APP_COLORS.BLACK}}>{product?.name}</Text>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>
              {currencyFormatter(price.price * price.quantity)} Rwf
            </Text>
          </View>
          <View style={[viewFlexSpace]}>
            <Pressable onPress={() => handleMinus()}>
              <View
                style={{
                  backgroundColor: APP_COLORS.MAROON,
                  borderRadius: 100,
                  padding: 3,
                }}>
                <Icon name="minus" size={25} color={APP_COLORS.WHITE} />
              </View>
            </Pressable>
            <Text
              style={{
                marginHorizontal: 10,
                color: APP_COLORS.TEXT_GRAY,
                fontSize: 20,
              }}>
              {price.quantity}
            </Text>
            <Pressable onPress={() => handlePlus()}>
              <View
                style={{
                  backgroundColor: APP_COLORS.MAROON,
                  borderRadius: 100,
                  padding: 3,
                }}>
                <Icon name="plus" size={25} color={APP_COLORS.WHITE} />
              </View>
            </Pressable>
          </View>
        </View>
      </WhiteCard>
    </View>
  );
};

export default DishProductItem;
