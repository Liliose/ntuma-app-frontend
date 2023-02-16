import {View, Text, Pressable, Alert} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../../../constants/colors';
import {viewFlexCenter, viewFlexSpace} from '../../../../constants/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../reducers';
import {INavigationProp} from '../../../../../interfaces';
import {resetCart} from '../../../../actions/cart';
import {resetFavourites} from '../../../../actions/favourites';
import {setSelectedMarket} from '../../../../actions/markets';

const ProductTabsHeader = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {selectedMarket} = useSelector((state: RootState) => state.markets);

  const resetMarket = () => {
    Alert.alert(
      'Confirmation',
      'Do you want to switch to other markets? If yes, your cart and favourite items list will be removed too.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'confirm',
          onPress: () => {
            dispatch(resetCart());
            dispatch(resetFavourites());
            dispatch(setSelectedMarket(undefined));
            navigation.replace('SelectMarket');
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View style={{padding: 10, backgroundColor: APP_COLORS.MAROON}}>
      <View style={[viewFlexSpace]}>
        <Pressable onPress={() => resetMarket()}>
          <Icon name="shopping-outline" size={25} color={APP_COLORS.WHITE} />
        </Pressable>
        <Pressable
          style={{flex: 1, marginHorizontal: 10}}
          onPress={() => resetMarket()}>
          <View
            style={[
              viewFlexCenter,
              {
                flexDirection: 'row',
                justifyContent: 'flex-start',
              },
            ]}>
            <Text
              style={{color: APP_COLORS.WHITE, fontSize: 20, marginRight: 10}}
              numberOfLines={1}>
              {selectedMarket?.name}
            </Text>
            <Icon2 name="angle-down" size={30} color={APP_COLORS.WHITE} />
          </View>
        </Pressable>
        <View>
          <Pressable style={{flex: 1, marginHorizontal: 10}}>
            <View>
              <Icon2 name="search" size={25} color={APP_COLORS.WHITE} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProductTabsHeader;
