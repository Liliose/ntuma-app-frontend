import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../../../constants/colors';
import {viewFlexCenter, viewFlexSpace} from '../../../../constants/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../reducers';
const ProductTabsHeader = () => {
  const {selectedMarket} = useSelector((state: RootState) => state.markets);
  return (
    <View style={{padding: 10, backgroundColor: APP_COLORS.MAROON}}>
      <View style={[viewFlexSpace]}>
        <Icon name="shopping-outline" size={25} color={APP_COLORS.WHITE} />
        <Pressable style={{flex: 1, marginHorizontal: 10}}>
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
