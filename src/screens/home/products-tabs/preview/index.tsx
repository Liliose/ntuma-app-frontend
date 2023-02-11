import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState, useEffect} from 'react';
import {IProduct} from '../../../../../interfaces';
import {APP_COLORS} from '../../../../constants/colors';
import {app} from '../../../../constants/app';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  btnWithoutBgContainerStyles,
  btnWithoutBgTextStyles,
  viewFlexCenter,
  viewFlexSpace,
} from '../../../../constants/styles';
import {currencyFormatter} from '../../../../helpers';
import MultiPrice from './multi-price';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width} = Dimensions.get('window');

interface IProductPreviewProps {
  product: IProduct | undefined;
  showModal: boolean;
  setShowModal: any;
}

const initialPrice = {
  price: 0,
  ppId: 0,
  productId: 0,
  priceType: '',
  customPrice: false,
};

const ProductPreview = ({
  product,
  showModal,
  setShowModal,
}: IProductPreviewProps) => {
  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState<number>(1);
  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };
  useEffect(() => {
    setPrice({
      ...price,
      productId: product?.pId as number,
      priceType: product?.priceType as string,
      price: product?.priceType === 'single' ? product.singlePrice : 0,
    });
  }, [product]);
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationOutTiming={700}
      isVisible={showModal}
      onBackButtonPress={() => setShowModal(false)}
      style={{padding: 0, margin: 0}}>
      <View
        style={{
          flex: 1,
          backgroundColor: APP_COLORS.WHITE,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          marginTop: 30,
          position: 'relative',
        }}>
        <Image
          source={{uri: app.FILE_URL + product?.image}}
          resizeMode="contain"
          style={{
            width,
            height: 230,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        />
        <KeyboardAwareScrollView>
          <View style={{padding: 10}}>
            <ScrollView>
              <View style={[viewFlexSpace, {marginBottom: 10}]}>
                <Text
                  style={{
                    color: APP_COLORS.BLACK,
                    fontSize: 20,
                    flex: 1,
                    paddingRight: 10,
                    textTransform: 'capitalize',
                  }}>
                  {product?.name}
                </Text>
                <View
                  style={[
                    viewFlexCenter,
                    {
                      backgroundColor: APP_COLORS.DARK_GRAY,
                      padding: 10,
                      borderRadius: 100,
                    },
                  ]}>
                  <Icon name="heart" size={25} color={APP_COLORS.BLACK} />
                </View>
              </View>
              <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                {product?.description}
              </Text>
              {product?.priceType === 'single' ? (
                price.customPrice ? (
                  <Pressable
                    onPress={() =>
                      setPrice({
                        ...price,
                        price: product.singlePrice,
                        customPrice: false,
                      })
                    }>
                    <View
                      style={[
                        viewFlexSpace,
                        {
                          marginVertical: 15,
                          padding: 10,
                          borderColor: APP_COLORS.PRODUCT_CARD_BORDER,
                          borderWidth: 1,
                        },
                      ]}>
                      <Text
                        style={{
                          color: APP_COLORS.BLACK,
                          fontSize: 20,
                          fontWeight: '600',
                        }}>
                        Price
                      </Text>
                      <Icon name="down" size={25} color={APP_COLORS.BLACK} />
                    </View>
                  </Pressable>
                ) : (
                  <View
                    style={{
                      marginVertical: 15,
                      padding: 10,
                      borderColor: APP_COLORS.PRODUCT_CARD_BORDER,
                      borderWidth: 1,
                    }}>
                    <Text
                      style={{
                        color: APP_COLORS.BLACK,
                        fontSize: 20,
                        fontWeight: '600',
                      }}>
                      Price
                    </Text>
                    <View style={[viewFlexSpace, {marginTop: 10}]}>
                      <Text style={{color: APP_COLORS.BLACK}}>
                        {currencyFormatter(product.singlePrice)} RWF
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
                )
              ) : (
                <MultiPrice
                  product={product}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  handleMinus={handleMinus}
                  handlePlus={handlePlus}
                  setPrice={setPrice}
                  priceState={price}
                />
              )}
              {product?.supportsDynamicPrice && (
                <View style={{marginVertical: 10}}>
                  {price.customPrice === false ? (
                    <Pressable
                      onPress={() => {
                        setPrice({
                          ...price,
                          price: 0,
                          customPrice: true,
                          ppId: 0,
                        });
                        setQuantity(1);
                      }}>
                      <View style={[viewFlexSpace]}>
                        <Text
                          style={{
                            color: APP_COLORS.BLACK,
                            fontSize: 20,
                            fontWeight: '600',
                          }}>
                          Custom Price
                        </Text>
                        <Icon name="down" size={25} color={APP_COLORS.BLACK} />
                      </View>
                    </Pressable>
                  ) : (
                    <View>
                      <Text
                        style={{
                          color: APP_COLORS.BLACK,
                          fontSize: 20,
                          fontWeight: '600',
                        }}>
                        Custom Price
                      </Text>
                      <TextInput
                        style={{
                          borderColor: APP_COLORS.PRODUCT_CARD_BORDER,
                          borderWidth: 1,
                          marginTop: 5,
                          padding: 10,
                          borderRadius: 10,
                          color: APP_COLORS.BLACK,
                        }}
                        keyboardType="number-pad"
                        placeholder="Enter amount you wish to pay"
                        onChangeText={text => {
                          setPrice({...price, price: Number(text)});
                        }}
                      />
                    </View>
                  )}
                </View>
              )}
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: APP_COLORS.BLACK,
                  }}>
                  Total : {currencyFormatter(price.price * quantity)} RWF
                </Text>
              </View>
              <View style={{marginVertical: 10}}>
                <View style={[btnWithBgContainerStyles, {marginBottom: 10}]}>
                  <Text style={btnWithBgTextStyles}>Add to cart</Text>
                </View>
                <Pressable onPress={() => setQuantity(1)}>
                  <View style={btnWithoutBgContainerStyles}>
                    <Text style={btnWithoutBgTextStyles}>Reset</Text>
                  </View>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
        <View style={{position: 'absolute', top: 0, right: 0}}>
          <Pressable onPress={() => setShowModal(false)}>
            <View
              style={{
                backgroundColor: APP_COLORS.DARK_GRAY,
                padding: 10,
                borderRadius: 100,
                marginTop: 25,
                marginRight: 20,
              }}>
              <Icon name="close" size={25} color={APP_COLORS.BLACK} />
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ProductPreview;
