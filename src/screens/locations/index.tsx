import {View, Text, ScrollView, Pressable, Alert} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../constants/colors';
import WhiteCard from '../../components/white-card';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {viewFlexSpace} from '../../constants/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {removeLocation} from '../../actions/locations';
import {ILocation} from '../../../interfaces';

const Locations = () => {
  const dispatch = useDispatch();
  const {locations} = useSelector((state: RootState) => state.locations);

  const deleteLocation = (item: ILocation) => {
    Alert.alert(
      'Confirmation',
      'Do you want to remove this location?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'confirm',
          onPress: () => {
            dispatch(removeLocation(item));
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS.WHITE,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {locations.map((item, index) => (
          <WhiteCard key={index} style={{marginBottom: 15}}>
            <View style={{padding: 10}}>
              <View style={[viewFlexSpace, {alignItems: 'flex-start'}]}>
                <Icon2 name="location" size={25} color={APP_COLORS.BLACK} />
                <Text
                  style={{
                    color: APP_COLORS.TEXT_GRAY,
                    marginHorizontal: 10,
                    flex: 1,
                  }}>
                  {item.name}
                </Text>
                <Pressable
                  onPress={() => {
                    deleteLocation(item);
                  }}>
                  <View>
                    <Icon name="close" size={25} color={APP_COLORS.BLACK} />
                  </View>
                </Pressable>
              </View>
            </View>
          </WhiteCard>
        ))}
      </ScrollView>
    </View>
  );
};

export default Locations;
