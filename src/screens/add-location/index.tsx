//@ts-nocheck
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
navigator.geolocation = require('@react-native-community/geolocation');
const AddLocation = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      currentLocation={true}
      query={{
        key: 'AIzaSyAF30iuJh36oK1yaKAjCwrJ0pdP4zQXYg8',
        language: 'en',
      }}
    />
  );
};

export default AddLocation;
