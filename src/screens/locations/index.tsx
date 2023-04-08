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
import NotFound from '../../components/not-found';

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        {locations.map((item, index) => (
          <WhiteCard key={index} style={{marginBottom: 15}}>
            <View style={{padding: 10}}>
              <View style={[viewFlexSpace, {alignItems: 'flex-start'}]}>
                <Icon2 name="location" size={25} color={APP_COLORS.BLACK} />
                <View style={{marginHorizontal: 10, flex: 1}}>
                  <Text
                    style={{
                      color: APP_COLORS.BLACK,
                    }}>
                    {item.name}
                  </Text>
                  {item.houseNumber.trim() !== '' && (
                    <Text>House Number: {item.houseNumber} </Text>
                  )}
                  <Text
                    style={{
                      color: APP_COLORS.TEXT_GRAY,
                    }}>
                    {item.description}
                  </Text>
                </View>
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
        {locations.length === 0 && <NotFound title="No locations saved yet" />}
      </ScrollView>
    </View>
  );
};

export default Locations;
