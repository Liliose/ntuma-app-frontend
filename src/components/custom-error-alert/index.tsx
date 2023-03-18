import {View, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {APP_COLORS} from '../../constants/colors';
import {Pressable} from 'react-native';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  btnWithoutBgContainerStyles,
  btnWithoutBgTextStyles,
  viewFlexCenter,
  viewFlexSpace,
} from '../../constants/styles';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

interface ICustomErrorAlertsProps {
  hasCloseButton?: boolean;
  disableBackButtonPress?: boolean;
  children: JSX.Element[] | JSX.Element;
  callBack?: any;
  showAlert: boolean;
  setShowAlert: any;
  confirmationTitle?: string;
}

const CustomErrorAlert = (props: ICustomErrorAlertsProps) => {
  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOutDown"
      backdropOpacity={0.5}
      animationOutTiming={700}
      isVisible={props.showAlert}
      onBackButtonPress={() =>
        props.disableBackButtonPress !== undefined
          ? props.setShowAlert(props.disableBackButtonPress)
          : props.setShowAlert(false)
      }
      style={{padding: 0, margin: 0}}>
      <View
        style={{
          backgroundColor: APP_COLORS.WHITE,
          marginRight: 20,
          marginLeft: 20,
          padding: 20,
          borderRadius: 10,
          position: 'relative',
        }}>
        <View style={[viewFlexCenter]}>
          <FastImage
            source={require('../../assets/error-black.gif')}
            style={{width: 120, height: 120}}
          />
          {props.children}
        </View>
        <View style={[viewFlexSpace, {marginTop: 25}]}>
          {props.hasCloseButton !== undefined ? (
            props.hasCloseButton && (
              <Pressable
                onPress={() => props.setShowAlert(false)}
                style={{
                  flex: 1,
                  marginRight:
                    props.confirmationTitle !== undefined
                      ? props.confirmationTitle
                        ? 5
                        : 0
                      : 5,
                }}>
                <View style={[btnWithoutBgContainerStyles]}>
                  <Text style={[btnWithoutBgTextStyles]}>Close</Text>
                </View>
              </Pressable>
            )
          ) : (
            <Pressable
              onPress={() => props.setShowAlert(false)}
              style={{
                flex: 1,
                marginRight:
                  props.confirmationTitle !== undefined
                    ? props.confirmationTitle
                      ? 5
                      : 0
                    : 5,
              }}>
              <View style={[btnWithoutBgContainerStyles]}>
                <Text
                  style={[btnWithoutBgTextStyles, {color: APP_COLORS.MAROON}]}>
                  Close
                </Text>
              </View>
            </Pressable>
          )}

          {props.confirmationTitle !== undefined && (
            <Pressable
              onPress={() => props.callBack !== undefined && props.callBack()}
              style={{
                flex: 1,
                marginLeft:
                  props.hasCloseButton !== undefined
                    ? props.hasCloseButton
                      ? 5
                      : 0
                    : 5,
              }}>
              <View style={[btnWithBgContainerStyles]}>
                <Text style={[btnWithBgTextStyles]}>
                  {props.confirmationTitle}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
        {props.hasCloseButton !== undefined ? (
          props.hasCloseButton && (
            <View style={{position: 'absolute', right: 0, top: 0}}>
              <Pressable
                onPress={() => props.setShowAlert(false)}
                style={{padding: 10}}>
                <Icon name="close" size={35} color={APP_COLORS.MAROON} />
              </Pressable>
            </View>
          )
        ) : (
          <View style={{position: 'absolute', right: 0, top: 0}}>
            <Pressable
              onPress={() => props.setShowAlert(false)}
              style={{padding: 10}}>
              <Icon name="close" size={35} color={APP_COLORS.MAROON} />
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CustomErrorAlert;
