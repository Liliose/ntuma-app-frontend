import {View, Text, ScrollView, Image, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {APP_COLORS} from '../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import Loader from './loader';
import {fetchDishes} from '../../../actions/dishes';
import {viewFlexSpace} from '../../../constants/styles';
import {app} from '../../../constants/app';
import Icon from 'react-native-vector-icons/Entypo';
import {INavigationProp} from '../../../../interfaces';

const Dishes = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const dishes = useSelector((state: RootState) => state.dishes);
  useEffect(() => {
    dispatch(fetchDishes());
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE, padding: 10}}>
      {products.isLoading || dishes.isLoading ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {dishes.dishes.map((item, index) => (
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
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Dishes;
