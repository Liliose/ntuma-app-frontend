import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {IDish, INavigationPropWithRouteRequired} from '../../../../interfaces';
import {APP_COLORS} from '../../../constants/colors';
import {viewFlexCenter, viewFlexSpace} from '../../../constants/styles';
import {app} from '../../../constants/app';
import DishProductItem from './dish-product-item';

const DishDetails = ({route, navigation}: INavigationPropWithRouteRequired) => {
  const {dish} = route.params as {dish: IDish};
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

        <View style={{padding: 20}}>
          <View style={[viewFlexSpace]}>
            <View>
              <Text
                style={{
                  color: APP_COLORS.BLACK,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                {dish.name}
              </Text>
              <Text style={{color: APP_COLORS.TEXT_GRAY}}>Ingredients</Text>
            </View>
            {dish.utubeLink.trim() !== '' && (
              <View style={[viewFlexCenter]}>
                <Image
                  source={require('../../../assets/youtube.png')}
                  style={{width: 40, height: 40}}
                  resizeMode="contain"
                />
                <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                  Watch on youtube
                </Text>
              </View>
            )}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {dish.products.map((item, index) => (
              <DishProductItem
                key={index}
                navigation={navigation}
                dishProduct={item}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default DishDetails;
