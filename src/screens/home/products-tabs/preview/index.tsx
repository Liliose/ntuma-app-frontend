import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import Modal from 'react-native-modal';
import React, {useState, useEffect} from 'react';
import {
  ICartItem,
  INavigationProp,
  IProduct,
  TOAST_MESSAGE_TYPES,
} from '../../../../../interfaces';
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
import {currencyFormatter, toastMessage} from '../../../../helpers';
import MultiPrice from './multi-price';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../reducers';
import {addCartItem} from '../../../../actions/cart';
import {
  addFavouriteItem,
  removeFavouriteItem,
} from '../../../../actions/favourites';
import ImageLoader from '../../../../components/image-loader';

const {width} = Dimensions.get('window');

interface IProductPreviewProps extends INavigationProp {
  product: IProduct | undefined;
  showModal: boolean;
  setShowModal: any;
  selectedCartItem?: ICartItem;
}

const initialPrice: ICartItem = {
  price: 0,
  ppId: 0,
  productId: 0,
  priceType: '' as any,
  customPrice: false,
  quantity: 1,
};

const ProductPreview = ({
  product,
  showModal,
  setShowModal,
  navigation,
  selectedCartItem,
}: IProductPreviewProps) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state: RootState) => state.user);
  const {favourites} = useSelector((state: RootState) => state.favourites);
  const [productExistsInFavList, setProductExistsInFavList] = useState(false);
  const [price, setPrice] = useState<ICartItem>(initialPrice);
  const handlePlus = () => {
    setPrice({...price, quantity: price.quantity + 1});
  };
  const handleMinus = () => {
    if (price.quantity - 1 > 0) {
      setPrice({...price, quantity: price.quantity - 1});
    } else {
      setPrice({...price, quantity: 1});
    }
  };
  useEffect(() => {
    if (selectedCartItem) {
      setPrice(selectedCartItem);
    } else {
      setPrice({
        ...initialPrice,
        productId: product?.pId as number,
        priceType: product?.priceType as string,
        price: product?.priceType === 'single' ? product.singlePrice : 0,
      });
    }
    const exists = favourites.find(item => item.pId === product?.pId);
    if (exists) {
      setProductExistsInFavList(true);
    } else {
      setProductExistsInFavList(false);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (price.price === 0) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Warning',
        textBody:
          'Price can not be zero or empty. Please increase the quantity or choose a specific pricing category.',
        button: 'OK',
        // onHide: () => {},
      });
      return;
    }
    if (token.trim() === '') {
      navigation.navigate('Login');
      toastMessage(TOAST_MESSAGE_TYPES.INFO, 'You must be logged in first');
      return;
    }
    try {
      setShowModal(false);
      dispatch(addCartItem(price));
      setTimeout(() => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Cart updated successful!',
          button: 'OK',
          // onHide: () => {},
        });
      }, 200);
    } catch (error: any) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error.message,
        button: 'OK',
        // onHide: () => {},
      });
    }
  };

  const addToFavList = (product: IProduct) => {
    dispatch(addFavouriteItem(product));
    setProductExistsInFavList(true);
  };

  const removeFromFavList = (product: IProduct) => {
    dispatch(removeFavouriteItem(product));
    setProductExistsInFavList(false);
  };

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
        <ImageLoader
          url={app.FILE_URL + product?.image}
          width={width}
          height={230}
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        />
        <KeyboardAvoidingView>
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
                {productExistsInFavList ? (
                  <Pressable
                    onPress={() => product && removeFromFavList(product)}>
                    <View
                      style={[
                        viewFlexCenter,
                        {
                          backgroundColor: APP_COLORS.MAROON,
                          padding: 10,
                          borderRadius: 100,
                        },
                      ]}>
                      <Icon name="heart" size={25} color={APP_COLORS.WHITE} />
                    </View>
                  </Pressable>
                ) : (
                  <Pressable onPress={() => product && addToFavList(product)}>
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
                  </Pressable>
                )}
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
                          {price.quantity}
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
                          quantity: 1,
                        });
                      }}>
                      <View style={[viewFlexSpace, {paddingHorizontal: 10}]}>
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
                    <View style={{paddingHorizontal: 10}}>
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
                    fontWeight: '600',
                    fontSize: 16,
                    color: APP_COLORS.BLACK,
                    textAlign: 'center',
                  }}>
                  Total Amount:{' '}
                  {currencyFormatter(price.price * price.quantity)} RWF
                </Text>
              </View>
              <View style={{marginVertical: 10}}>
                <Pressable
                  onPress={() => handleAddToCart()}
                  style={{marginBottom: 10}}>
                  <View style={[btnWithBgContainerStyles]}>
                    <Text style={btnWithBgTextStyles}>
                      {selectedCartItem ? 'Update cart' : 'Add to cart'}
                    </Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => setPrice({...price, quantity: 1})}>
                  <View style={btnWithoutBgContainerStyles}>
                    <Text style={btnWithoutBgTextStyles}>Reset</Text>
                  </View>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <View style={{position: 'absolute', top: 0, right: 0, zIndex: 2}}>
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
