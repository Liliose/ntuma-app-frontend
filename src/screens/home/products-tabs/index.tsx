import {
  View,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  Text,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {setSelectedCategory} from '../../../actions/categories';
import {APP_COLORS} from '../../../constants/colors';
import {viewFlexCenter, viewFlexSpace} from '../../../constants/styles';
import Loader from './loader';
import ProductItem from './product-item';
import ProductPreview from './preview';
import {INavigationProp, IProduct} from '../../../../interfaces';
import {useLoadBasiData, validateSelectedMarket} from '../../../helpers';
import {resetCart} from '../../../actions/cart';
import {resetFavourites} from '../../../actions/favourites';
import {
  fetchProducts,
  setIsHardReLoadingProducts,
} from '../../../actions/products';
import {fetchProductPrices} from '../../../actions/productPrices';
import {fetchMarkets} from '../../../actions/markets';
import NotFound from '../../../components/not-found';
import CustomAlert from '../../../components/custom-alert';
import FastImage from 'react-native-fast-image';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Banners from './banners';
import {fetchBanners} from '../../../actions/banners';
const {height} = Dimensions.get('window');
interface IProductsProps extends INavigationProp {
  route: RouteProp<any>;
}

const Products = ({route, navigation}: IProductsProps) => {
  const loadBasicData = useLoadBasiData();
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const {categories, selectedCategory} = useSelector(
    (state: RootState) => state.categories,
  );
  const {selectedMarket, markets} = useSelector(
    (state: RootState) => state.markets,
  );
  const {products, isLoading, hardReloading, loadingError} = useSelector(
    (state: RootState) => state.products,
  );
  const {banners} = useSelector((state: RootState) => state.banners);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );

  const [refreshing, setRefreshing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // useEffect(() => {
  //   loadBasicData();
  // }, []);

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (!validateSelectedMarket(markets, selectedMarket)) {
        dispatch(resetCart());
        dispatch(resetFavourites());
        navigation.replace('SelectMarket');
      }
    }
    return () => {
      sub = false;
    };
  }, [selectedMarket, markets]);

  useFocusEffect(
    React.useCallback(() => {
      setShowLoader(true);
      try {
        const categoryId = route.name.split('_')[1];
        const cat = categories.find(item => item.id === Number(categoryId));
        if (cat) {
          dispatch(setSelectedCategory(cat));
        }
        setShowLoader(false);
      } catch (error) {
        setShowLoader(false);
      }
    }, [route.name]),
  );

  useEffect(() => {
    let sub = true;
    if (sub) {
      loadingError.trim().length > 0 &&
        products.length === 0 &&
        setShowAlert(true);
    }
    return () => {
      sub = false;
    };
  }, [loadingError]);

  useEffect(() => {
    let sub = true;
    if (sub) {
      !isLoading && refreshing && setRefreshing(false);
    }
    return () => {
      sub = false;
    };
  }, [isLoading]);

  const alertCallBack = () => {
    setShowAlert(false);
    dispatch(setIsHardReLoadingProducts(true));
    dispatch(fetchProducts());
    dispatch(fetchProductPrices());
    dispatch(fetchMarkets());
    dispatch(fetchBanners());
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(setIsHardReLoadingProducts(true));
    dispatch(fetchProducts());
    dispatch(fetchProductPrices());
    dispatch(fetchMarkets());
    dispatch(fetchBanners());
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      changeNavigationBarColor('maroon');
    }
    dispatch(fetchBanners());
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE}}>
        <View style={[viewFlexSpace]}>
          <Image
            source={require('../../../assets/imigongo.png')}
            style={{width: 15, height}}
          />
          <View
            style={{
              flex: 1,
              marginBottom: 145,
            }}>
            {showLoader || (isLoading && products.length === 0) ? (
              <Loader />
            ) : (
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                showsVerticalScrollIndicator={false}>
                <View style={{padding: 10, marginVertical: 10, flex: 1}}>
                  {products.filter(
                    item =>
                      item.categoryId === selectedCategory?.id &&
                      item.marketId === selectedMarket?.mId,
                  ).length === 0 ? (
                    <NotFound title="No products found in this category" />
                  ) : (
                    products
                      .filter(
                        item =>
                          item.categoryId === selectedCategory?.id &&
                          item.marketId === selectedMarket?.mId,
                      )
                      .map((item, index) => (
                        <ProductItem
                          key={index}
                          item={item}
                          index={index}
                          setSelectedProduct={setSelectedProduct}
                          setShowModal={setShowModal}
                        />
                      ))
                  )}
                </View>
              </ScrollView>
            )}
            {banners.length > 0 && (
              <Banners navigation={navigation} banners={banners} />
            )}
          </View>
          <ProductPreview
            setShowModal={setShowModal}
            showModal={showModal}
            product={selectedProduct}
            navigation={navigation}
          />
          <CustomAlert
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            confirmationTitle="Try Again"
            callBack={alertCallBack}>
            <View style={[viewFlexCenter]}>
              <FastImage
                source={require('../../../assets/error-black.gif')}
                style={{width: 120, height: 120}}
              />
              <Text
                style={{
                  color: APP_COLORS.MAROON,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Something Went Wrong
              </Text>
              <Text style={{color: APP_COLORS.TEXT_GRAY}}>{loadingError}</Text>
            </View>
          </CustomAlert>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Products;
