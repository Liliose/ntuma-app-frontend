import {View, Image, Dimensions, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {setSelectedCategory} from '../../../actions/categories';
import {APP_COLORS} from '../../../constants/colors';
import {viewFlexSpace} from '../../../constants/styles';
import Loader from './loader';
import ProductItem from './product-item';
import ProductPreview from './preview';
import {INavigationProp, IProduct} from '../../../../interfaces';
import {useLoadBasiData, validateSelectedMarket} from '../../../helpers';
import {resetCart} from '../../../actions/cart';
import {resetFavourites} from '../../../actions/favourites';
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
  const {products, isLoading} = useSelector(
    (state: RootState) => state.products,
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );

  // useEffect(() => {
  //   loadBasicData();
  // }, []);

  useEffect(() => {
    if (!validateSelectedMarket(markets, selectedMarket)) {
      dispatch(resetCart());
      dispatch(resetFavourites());
      navigation.replace('SelectMarket');
    }
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
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE}}>
      <View style={[viewFlexSpace]}>
        <Image
          source={require('../../../assets/imigongo.png')}
          style={{width: 15, height}}
        />
        <View style={{flex: 1}}>
          {showLoader || (isLoading && products.length === 0) ? (
            <Loader />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{padding: 10, marginVertical: 10}}>
                {products
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
                  ))}
              </View>
            </ScrollView>
          )}
        </View>
        <ProductPreview
          setShowModal={setShowModal}
          showModal={showModal}
          product={selectedProduct}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default Products;
