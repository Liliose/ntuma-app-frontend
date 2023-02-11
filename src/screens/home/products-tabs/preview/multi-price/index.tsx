import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IProduct, IProductPrice} from '../../../../../../interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../reducers';
import Loader from '../../loader';
import {APP_COLORS} from '../../../../../constants/colors';
import {viewFlexSpace} from '../../../../../constants/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {currencyFormatter} from '../../../../../helpers';
import Icon2 from 'react-native-vector-icons/Entypo';

interface IMultiPriceProps {
  product: IProduct | undefined;
  quantity: number;
  setQuantity: any;
  handlePlus: any;
  handleMinus: any;
  setPrice: any;
  priceState: any;
}

const MultiPrice = ({
  product,
  quantity,
  setQuantity,
  handlePlus,
  handleMinus,
  setPrice,
  priceState,
}: IMultiPriceProps) => {
  const {prices, isLoading} = useSelector(
    (state: RootState) => state.productPrices,
  );
  const [productPrices, setProductPrices] = useState<IProductPrice[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<IProductPrice | undefined>(
    undefined,
  );
  useEffect(() => {
    setProductPrices(prices.filter(item => item.productId === product?.pId));
  }, [product]);
  useEffect(() => {
    if (selectedPrice !== undefined) {
      setQuantity(1);
      setPrice({
        ...priceState,
        price: selectedPrice.amount,
        ppId: selectedPrice.ppId,
        customPrice: false,
      });
    }
  }, [selectedPrice]);
  return (
    <View style={{marginVertical: 15}}>
      {isLoading ? (
        <Loader />
      ) : (
        <View
          style={{borderColor: APP_COLORS.PRODUCT_CARD_BORDER, borderWidth: 1}}>
          {productPrices.map((item, index) =>
            selectedPrice?.ppId === item.ppId &&
            priceState.customPrice === false ? (
              <View
                key={index}
                style={{
                  padding: 10,
                  borderBottomColor: APP_COLORS.PRODUCT_CARD_BORDER,
                  borderBottomWidth: 1,
                }}>
                <View>
                  <Text
                    style={{
                      color: APP_COLORS.BLACK,
                      fontSize: 20,
                      fontWeight: '600',
                    }}>
                    {item.name}
                  </Text>
                  <View style={[viewFlexSpace, {marginTop: 10}]}>
                    <Text style={{color: APP_COLORS.BLACK}}>
                      {currencyFormatter(item.amount)} RWF
                    </Text>
                    <Text style={{color: APP_COLORS.BLACK}}>X</Text>
                    <View
                      style={[
                        viewFlexSpace,
                        {backgroundColor: APP_COLORS.DARK_GRAY},
                      ]}>
                      <Pressable onPress={() => handleMinus()}>
                        <View
                          style={{
                            backgroundColor: APP_COLORS.MAROON,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                          }}>
                          <Icon2
                            name="minus"
                            color={APP_COLORS.WHITE}
                            size={25}
                          />
                        </View>
                      </Pressable>
                      <Text
                        style={{
                          paddingHorizontal: 15,
                          color: APP_COLORS.BLACK,
                          fontSize: 20,
                        }}>
                        {quantity}
                      </Text>
                      <Pressable onPress={() => handlePlus()}>
                        <View
                          style={{
                            backgroundColor: APP_COLORS.MAROON,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                          }}>
                          <Icon2
                            name="plus"
                            color={APP_COLORS.WHITE}
                            size={25}
                          />
                        </View>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <Pressable key={index} onPress={() => setSelectedPrice(item)}>
                <View
                  style={[
                    viewFlexSpace,
                    {
                      padding: 10,
                      borderBottomColor: APP_COLORS.PRODUCT_CARD_BORDER,
                      borderBottomWidth: 1,
                      alignItems: 'flex-start',
                    },
                  ]}>
                  <View style={{flex: 1, marginRight: 10}}>
                    <Text
                      style={{
                        color: APP_COLORS.BLACK,
                        fontSize: 20,
                        fontWeight: '600',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                  <View>
                    <Icon name="down" size={25} color={APP_COLORS.BLACK} />
                  </View>
                </View>
              </Pressable>
            ),
          )}
        </View>
      )}
    </View>
  );
};

export default MultiPrice;
