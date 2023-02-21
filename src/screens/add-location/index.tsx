//@ts-nocheck
import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Dimensions, Pressable, TextInput} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {INavigationProp, TOAST_MESSAGE_TYPES} from '../../../interfaces';
import {toastMessage} from '../../helpers';
import Modal from 'react-native-modal';
import {APP_COLORS} from '../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  btnWithoutBgContainerStyles,
  btnWithoutBgTextStyles,
  commonInput,
  viewFlexSpace,
} from '../../constants/styles';
import {useDispatch} from 'react-redux';
import {addLocation} from '../../actions/locations';
navigator.geolocation = require('@react-native-community/geolocation');
const {width} = Dimensions.get('window');
const AddLocation = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState({});
  const [selectedLocationText, setSelectedLocationText] = useState('');
  const [houseNumber, setHouseNumber] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const locationRef = useRef();

  useEffect(() => {
    const text = locationRef.current
      ? locationRef.current.getAddressText()
      : '-';
    setSelectedLocationText(text);
  }, [selectedLocation]);

  const handleClose = () => {
    setShowModal(false);
    locationRef.current.clear();
  };
  const handleSave = () => {
    if (description.trim() === '') {
      toastMessage(
        TOAST_MESSAGE_TYPES.INFO,
        'Please let us know more about your location. feel free to use any language you want.',
      );
      return;
    }
    dispatch(
      addLocation({
        name: selectedLocationText,
        data: selectedLocation.data,
        details: selectedLocation?.details,
        houseNumber,
        description,
      }),
    );
    navigation.navigate('Locations');
  };
  return (
    <>
      <GooglePlacesAutocomplete
        placeholder="Enter search keyword"
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // console.log('data', data);
          // console.log('details', details);
          setSelectedLocation({data, details});
          setShowModal(true);
        }}
        ref={locationRef}
        currentLocation={true}
        currentLocationLabel="Current Location | Aho uri nonaha"
        query={{
          key: 'AIzaSyAF30iuJh36oK1yaKAjCwrJ0pdP4zQXYg8',
          language: 'en',
          components: 'country:rw',
        }}
        onFail={error => {
          console.log(error);
          toastMessage(TOAST_MESSAGE_TYPES.ERROR, error);
        }}
      />

      <Modal
        animationIn="bounceIn"
        animationOut="bounceOut"
        backdropOpacity={0.1}
        animationOutTiming={700}
        isVisible={showModal}
        onBackButtonPress={() => setShowModal(false)}
        style={{padding: 0, margin: 0}}>
        <View
          style={{
            backgroundColor: APP_COLORS.WHITE,
            marginRight: 40,
            marginLeft: 40,
            padding: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontWeight: '700',
              marginBottom: 10,
              color: APP_COLORS.BLACK,
              fontSize: 16,
            }}>
            Selected location
          </Text>
          <Text style={{marginBottom: 10, color: APP_COLORS.TEXT_GRAY}}>
            {selectedLocationText}
          </Text>
          <View>
            <TextInput
              style={[commonInput, {marginBottom: 10}]}
              placeholder="House Number (optional)"
              onChangeText={text => setHouseNumber(text)}
            />
          </View>
          <View>
            <Text style={{color: APP_COLORS.BLACK}}>
              Help us know more about your location
            </Text>
            <TextInput
              style={[
                commonInput,
                {marginBottom: 10, textAlignVertical: 'top'},
              ]}
              placeholder="Extra Description. Ex near by the church,...."
              multiline={true}
              maxLength={100}
              numberOfLines={4}
              onChangeText={text => setDescription(text)}
            />
          </View>
          <View style={[viewFlexSpace, {marginTop: 10}]}>
            <Pressable
              style={{flex: 1, marginRight: 5}}
              onPress={() => handleClose()}>
              <View style={[btnWithoutBgContainerStyles]}>
                <Text
                  style={[btnWithoutBgTextStyles, {color: APP_COLORS.MAROON}]}>
                  Don't save
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={{flex: 1, marginLeft: 5}}
              onPress={() => handleSave()}>
              <View style={[btnWithBgContainerStyles]}>
                <Text style={[btnWithBgTextStyles]}>Save</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddLocation;
