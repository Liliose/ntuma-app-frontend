import {View, Image, Dimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {setSelectedCategory} from '../../../actions/categories';
import {APP_COLORS} from '../../../constants/colors';
import {viewFlexSpace} from '../../../constants/styles';
import {fetchProducts} from '../../../actions/products';
import Loader from './loader';
import ProductItem from './product-item';
import ProductPreview from './preview';
import {INavigationProp, IProduct} from '../../../../interfaces';
const {height} = Dimensions.get('window');
interface IProductsProps extends INavigationProp {
  route: RouteProp<any>;
}

const Products = ({route, navigation}: IProductsProps) => {
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const {categories, selectedCategory} = useSelector(
    (state: RootState) => state.categories,
  );
  const {selectedMarket} = useSelector((state: RootState) => state.markets);
  const {products, isLoading} = useSelector(
    (state: RootState) => state.products,
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );

  useFocusEffect(
    React.useCallback(() => {
      setShowLoader(true);
      try {
        const categoryId = route.name.split('_')[1];
        const cat = categories.find(item => item.id === Number(categoryId));
        if (cat) {
          dispatch(setSelectedCategory(cat));
          // dispatch(fetchProducts());
        }
        setTimeout(() => {
          setShowLoader(false);
        }, 100);
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
