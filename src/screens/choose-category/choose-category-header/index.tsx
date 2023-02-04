import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {INavigationProp} from '../../../../interfaces';
import {APP_COLORS} from '../../../constants/colors';
import {viewFlexCenter, viewFlexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChooseCategoryHeader = ({navigation}: INavigationProp) => {
  const {selectedMarket} = useSelector((state: RootState) => state.markets);
  return (
    <View
      style={[
        viewFlexSpace,
        {backgroundColor: APP_COLORS.MAROON, padding: 10, paddingBottom: 20},
      ]}>
      <Icon name="map-marker" size={25} color={APP_COLORS.WHITE} />
      <View style={{flex: 1, marginLeft: 10}}>
        <Pressable onPress={() => navigation.navigate('SelectMarket')}>
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
            <Icon name="angle-down" color={APP_COLORS.WHITE} size={30} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ChooseCategoryHeader;
