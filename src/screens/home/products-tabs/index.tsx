import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {setSelectedCategory} from '../../../actions/categories';
import {APP_COLORS} from '../../../constants/colors';
import {viewFlexCenter, viewFlexSpace} from '../../../constants/styles';
import {fetchProducts, setIsLoadingProducts} from '../../../actions/products';
import Loader from './loader';
import {app} from '../../../constants/app';
import Icon from 'react-native-vector-icons/AntDesign';
import {currencyFormatter} from '../../../helpers';
const {height, width} = Dimensions.get('window');
interface IProductsProps {
  route: RouteProp<any>;
}

const Products = ({route}: IProductsProps) => {
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const {categories, selectedCategory} = useSelector(
    (state: RootState) => state.categories,
  );
  const {selectedMarket} = useSelector((state: RootState) => state.markets);
  const {products, isLoading} = useSelector(
    (state: RootState) => state.products,
  );
  useFocusEffect(
    React.useCallback(() => {
      setShowLoader(true);
      try {
        const categoryId = route.name.split('_')[1];
        const cat = categories.find(item => item.id === Number(categoryId));
        if (cat) {
          dispatch(setSelectedCategory(cat));
          dispatch(fetchProducts());
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
                    <View
                      key={index}
                      style={[
                        viewFlexSpace,
                        {
                          borderBottomColor: APP_COLORS.BLACK,
                          borderBottomWidth: 1,
                          marginBottom: 10,
                        },
                      ]}>
                      <View style={{position: 'relative'}}>
                        <Image
                          source={{uri: app.FILE_URL + item.image}}
                          style={{
                            width: width / 2 - 40,
                            height: width / 2 - 80,
                          }}
                        />
                        <View
                          style={[
                            viewFlexCenter,
                            {
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              height: 35,
                              width: 35,
                              borderRadius: 100,
                              backgroundColor: APP_COLORS.WHITE,
                              marginRight: 5,
                              marginTop: 5,
                            },
                          ]}>
                          <Icon
                            name="hearto"
                            size={25}
                            color={APP_COLORS.BLACK}
                          />
                        </View>
                      </View>
                      <View style={{flex: 1, paddingLeft: 10}}>
                        <Text
                          style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
                          {item.name}
                        </Text>
                        <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                          {item.description}
                        </Text>
                        {item.priceType === 'single' && (
                          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                            <Text
                              style={{
                                color: APP_COLORS.BLACK,
                                fontWeight: 'bold',
                              }}>
                              Price:
                            </Text>{' '}
                            {currencyFormatter(item.singlePrice)} RWF
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default Products;
