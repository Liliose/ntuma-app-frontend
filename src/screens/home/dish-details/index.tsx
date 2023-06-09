import {View, Text, Image, ScrollView, Pressable, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ICartItem,
  IDish,
  INavigationPropWithRouteRequired,
  IProduct,
} from '../../../../interfaces';
import {APP_COLORS} from '../../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  viewFlexCenter,
  viewFlexSpace,
} from '../../../constants/styles';
import {app} from '../../../constants/app';
import DishProductItem from './dish-product-item';
import {currencyFormatter} from '../../../helpers';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {addCartItem} from '../../../actions/cart';
import ProductPreview from '../products-tabs/preview';
import Icon from 'react-native-vector-icons/Entypo';
import {t} from 'i18next';

const initialPrice: ICartItem = {
  price: 0,
  ppId: 0,
  productId: 0,
  priceType: '' as any,
  customPrice: false,
  quantity: 1,
};
const DishDetails = ({route, navigation}: INavigationPropWithRouteRequired) => {
  const dispatch = useDispatch();
  const {dish} = route.params as {dish: IDish};
  const {products} = useSelector((state: RootState) => state.products);
  const {prices} = useSelector((state: RootState) => state.productPrices);
  const [productPrices, setProductPrices] = useState<ICartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );
  const [selectedCartItem, setSelectedCartItem] = useState<
    ICartItem | undefined
  >(undefined);

  const handleProductPriceChange = (cartItem: ICartItem) => {
    const index = productPrices.findIndex(
      item => item.productId === cartItem.productId,
    );
    if (index > -1) {
      const newState = [...productPrices];
      newState[index] = cartItem;
      setProductPrices(newState);
    } else {
      setProductPrices([...productPrices, cartItem]);
    }
  };

  useEffect(() => {
    setTotalPrice(prevPrice => {
      let sum = 0;
      for (let i = 0; i < productPrices.length; i++) {
        sum +=
          Number(productPrices[i].price) * Number(productPrices[i].quantity);
      }
      return sum;
    });
  }, [productPrices]);

  //initial product prices
  useEffect(() => {
    const newState: ICartItem[] = [];
    for (let i = 0; i < dish.products.length; i++) {
      const product = products.find(
        item => item.pId === dish.products[i].productId,
      );
      if (product) {
        if (product?.priceType === 'single') {
          newState.push({
            ...initialPrice,
            productId: product?.pId as number,
            priceType: product?.priceType as string,
            price: product?.priceType === 'single' ? product.singlePrice : 0,
          });
        } else {
          const allPrices = prices.filter(
            item => item.productId === product?.pId,
          );
          if (allPrices.length > 0) {
            //get small price
            const smallPrice = allPrices.reduce((min, current) => {
              return current.amount < min.amount ? current : min;
            });
            //get small price
            newState.push({
              ...initialPrice,
              productId: product?.pId as number,
              priceType: product?.priceType as string,
              price: smallPrice.amount,
              ppId: smallPrice.ppId,
            });
          }
        }
      }
    }
    setProductPrices(newState);
  }, []);
  //initial product prices

  const handleAddToCart = () => {
    if (totalPrice === 0) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Warning',
        textBody:
          "All Product's Price on this dish can not be zero. Please increase the quantity of at leat one product.",
        button: 'OK',
        // onHide: () => {},
      });
    } else {
      for (let i = 0; i < productPrices.length; i++) {
        if (productPrices[i].quantity > 0) {
          dispatch(addCartItem(productPrices[i]));
        }
      }
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Cart updated successful!',
        button: 'OK',
        onHide: () => {
          navigation.navigate('Cart');
        },
      });
    }
  };

  const openLink = async (url: string) => {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      // console.log(`Unable to open URL: ${url}`);
      // //@ts-ignore
      // alert(`Unable to open URL: ${url}`);
      // //@ts-ignore
      navigation.navigate('URLPreview', {url});
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.MAROON}}>
      <View
        style={{
          flex: 1,
          backgroundColor: APP_COLORS.WHITE,
          marginTop: 100,
          borderTopRightRadius: 70,
          borderTopLeftRadius: 70,
        }}>
        <View style={[viewFlexCenter, {marginTop: -90, marginBottom: 10}]}>
          <Image
            source={{uri: app.FILE_URL + dish.image}}
            style={{width: 200, height: 200, borderRadius: 100}}
            resizeMode="contain"
          />
        </View>

        <View style={{padding: 20, flex: 1}}>
          <View style={[viewFlexSpace]}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: APP_COLORS.BLACK,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                {dish.name}
              </Text>
              <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                {dish.products.length} Ingredients
              </Text>
              <View
                style={[
                  viewFlexSpace,
                  {alignItems: 'flex-start', marginTop: 5},
                ]}>
                <Icon
                  name="info-with-circle"
                  size={25}
                  style={{marginRight: 5}}
                  color={APP_COLORS.GREEN}
                />
                <Text style={{color: APP_COLORS.GREEN, flex: 1}}>
                  {t('dishInfoText')}
                </Text>
              </View>
            </View>
            {dish.utubeLink.trim() !== '' && (
              <Pressable onPress={() => openLink(dish.utubeLink)}>
                <View style={[viewFlexCenter, {marginLeft: 10}]}>
                  <Image
                    source={require('../../../assets/youtube.png')}
                    style={{width: 40, height: 40}}
                    resizeMode="contain"
                  />
                  <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                    Watch on youtube
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
          <ScrollView>
            {dish.products.map((item, index) => (
              <DishProductItem
                key={index}
                navigation={navigation}
                dishProduct={item}
                handleProductPriceChange={handleProductPriceChange}
                setSelectedProduct={setSelectedProduct}
                setShowModal={setShowModal}
              />
            ))}
          </ScrollView>
          <View style={{padding: 10}}>
            <Text style={{color: APP_COLORS.BLACK, textAlign: 'center'}}>
              Total: {currencyFormatter(totalPrice)} Rwf
            </Text>
          </View>
          <Pressable onPress={() => handleAddToCart()}>
            <View style={[btnWithBgContainerStyles]}>
              <Text style={[btnWithBgTextStyles]}>Add to cart</Text>
            </View>
          </Pressable>
        </View>
      </View>
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

export default DishDetails;
