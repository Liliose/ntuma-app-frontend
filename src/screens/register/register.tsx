import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  btnWithoutBgContainerStyles,
  btnWithoutBgTextStyles,
  commonInput,
  viewFlexCenter,
  viewFlexSpace,
} from '../../constants/styles';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {INavigationProp} from '../../../interfaces';

const {height} = Dimensions.get('window');

const Register = ({navigation}: INavigationProp) => {
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE}}>
      <View style={[viewFlexSpace]}>
        <Image
          source={require('../../assets/imigongo.png')}
          style={{width: 10, height}}
        />
        <KeyboardAwareScrollView style={{flex: 1, height: '100%'}}>
          <ScrollView>
            <View style={{padding: 10}}>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: APP_COLORS.TEXT_GRAY,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Username
                </Text>
                <TextInput
                  placeholder="Enter your username"
                  style={commonInput}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: APP_COLORS.TEXT_GRAY,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Password
                </Text>
                <TextInput
                  placeholder="Enter your password"
                  style={commonInput}
                />
              </View>

              <Pressable style={{marginVertical: 10}}>
                <View style={[btnWithBgContainerStyles]}>
                  <Text style={[btnWithBgTextStyles]}> Sign up</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('Login')}
                style={{marginVertical: 10}}>
                <View style={[btnWithoutBgContainerStyles]}>
                  <Text
                    style={[
                      btnWithoutBgTextStyles,
                      {color: APP_COLORS.MAROON},
                    ]}>
                    Sign in
                  </Text>
                </View>
              </Pressable>

              <View style={[viewFlexCenter, {marginTop: 20}]}>
                <Text style={{color: APP_COLORS.BLACK}}>Or Singn up with</Text>

                <View
                  style={{
                    marginVertical: 30,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderColor: APP_COLORS.DARK_GRAY,
                    borderWidth: 1,
                  }}>
                  <Image
                    source={require('../../assets/google.png')}
                    style={{width: 50}}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default Register;
