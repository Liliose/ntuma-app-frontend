import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {APP_COLORS} from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {viewFlexSpace} from '../../constants/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageLoader from '../../components/image-loader';
import {app} from '../../constants/app';
import {setProductsSearchKeyword} from '../../actions/products';
import {resetRecentSearches} from '../../actions/recentSearches';
import ProductPreview from '../home/products-tabs/preview';
import {INavigationProp, IProduct} from '../../../interfaces';

const SearchProducts = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {searches} = useSelector((state: RootState) => state.recentSearches);
  const {productsSearchResults, searchKeyword} = useSelector(
    (state: RootState) => state.products,
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE, padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {searches.length > 0 && (
          <>
            <View style={[viewFlexSpace, {marginBottom: 5}]}>
              <Text style={{color: APP_COLORS.BLACK, fontWeight: '600'}}>
                Recently Searched
              </Text>
              <View style={[viewFlexSpace]}>
                <Pressable onPress={() => dispatch(resetRecentSearches())}>
                  <Text style={{color: APP_COLORS.MAROON}}>Clear All</Text>
                </Pressable>
                <Pressable
                  style={{marginLeft: 10}}
                  onPress={() => dispatch(setProductsSearchKeyword(''))}>
                  <Text style={{color: APP_COLORS.MAROON}}>| Clear Search</Text>
                </Pressable>
              </View>
            </View>
            {searches.slice(0, 3).map((item, index) => (
              <Pressable
                key={index}
                style={{marginBottom: 5}}
                onPress={() => dispatch(setProductsSearchKeyword(item))}>
                <View style={[viewFlexSpace]}>
                  <Icon name="history" size={25} color={APP_COLORS.TEXT_GRAY} />
                  <Text
                    style={{
                      color: APP_COLORS.TEXT_GRAY,
                      flex: 1,
                      marginLeft: 5,
                    }}>
                    {item}
                  </Text>
                </View>
              </Pressable>
            ))}
          </>
        )}
        <Text
          style={{
            color: APP_COLORS.BLACK,
            marginVertical: 10,
            fontWeight: '600',
          }}>
          Search Results for '{searchKeyword}'
        </Text>
        {productsSearchResults.map((item, index) => (
          <Pressable
            style={{marginBottom: 10}}
            key={index}
            onPress={() => {
              setSelectedProduct(item);
              setShowModal(true);
            }}>
            <View style={[viewFlexSpace]}>
              <ImageLoader
                url={app.FILE_URL + item.image}
                width={50}
                height={50}
                style={{borderRadius: 100}}
              />
              <Text style={{flex: 1, color: APP_COLORS.BLACK, marginLeft: 10}}>
                {item.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <ProductPreview
        setShowModal={setShowModal}
        showModal={showModal}
        product={selectedProduct}
        navigation={navigation}
      />
    </View>
  );
};

export default SearchProducts;
