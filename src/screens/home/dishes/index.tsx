import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {APP_COLORS} from '../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import Loader from './loader';
import {fetchDishes, setIsHardReLoadingDishes} from '../../../actions/dishes';
import {viewFlexCenter, viewFlexSpace} from '../../../constants/styles';
import {app} from '../../../constants/app';
import Icon from 'react-native-vector-icons/Entypo';
import {INavigationProp} from '../../../../interfaces';
import {fetchProducts} from '../../../actions/products';
import {fetchProductPrices} from '../../../actions/productPrices';
import CustomAlert from '../../../components/custom-alert';
import FastImage from 'react-native-fast-image';

const Dishes = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const dishes = useSelector((state: RootState) => state.dishes);

  const [showAlert, setShowAlert] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchDishes());
  }, []);

  useEffect(() => {
    let sub = true;
    if (sub) {
      dishes.loadingError.trim().length > 0 &&
        dishes.dishes.length === 0 &&
        setShowAlert(true);
    }
    return () => {
      sub = false;
    };
  }, [dishes.loadingError]);

  useEffect(() => {
    let sub = true;
    if (sub) {
      !dishes.isLoading && refreshing && setRefreshing(false);
    }
    return () => {
      sub = false;
    };
  }, [dishes.isLoading]);

  const alertCallBack = () => {
    setShowAlert(false);
    dispatch(setIsHardReLoadingDishes(true));
    dispatch(fetchProducts());
    dispatch(fetchProductPrices());
    dispatch(fetchDishes());
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(setIsHardReLoadingDishes(true));
    dispatch(fetchProducts());
    dispatch(fetchProductPrices());
    dispatch(fetchDishes());
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE, padding: 10}}>
        {products.isLoading || dishes.isLoading ? (
          <Loader />
        ) : (
          dishes.dishes.map((item, index) => (
            <Pressable
              key={index}
              style={{marginBottom: 10}}
              onPress={() => navigation.navigate('DishDetails', {dish: item})}>
              <View style={[viewFlexSpace]}>
                <Image
                  source={{uri: app.FILE_URL + item.image}}
                  style={{width: 100, height: 100, borderRadius: 100}}
                  resizeMode="contain"
                />
                <View style={{flex: 1, marginHorizontal: 10}}>
                  <Text
                    style={{
                      color: APP_COLORS.BLACK,
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    {item.name}
                  </Text>
                  <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                    {item.products.length} Products
                  </Text>
                </View>
                <Icon
                  name="chevron-right"
                  size={30}
                  color={APP_COLORS.TEXT_GRAY}
                />
              </View>
            </Pressable>
          ))
        )}
      </View>
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
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>
            {dishes.loadingError}
          </Text>
        </View>
      </CustomAlert>
    </ScrollView>
  );
};

export default Dishes;
