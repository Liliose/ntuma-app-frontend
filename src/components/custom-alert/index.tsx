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
  viewFlexSpace,
} from '../../constants/styles';

interface ICustomAlertsProps {
  hasCloseButton?: boolean;
  disableBackButtonPress?: boolean;
  children: JSX.Element[] | JSX.Element;
  callBack?: any;
  showAlert: boolean;
  setShowAlert: any;
  confirmationTitle?: string;
  doesCloseBtnHasACallBack?: boolean;
}

const CustomAlert = (props: ICustomAlertsProps) => {
  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOutDown"
      backdropOpacity={0.5}
      animationOutTiming={700}
      isVisible={props.showAlert}
      onBackButtonPress={() =>
        props.disableBackButtonPress !== undefined
          ? props.doesCloseBtnHasACallBack !== undefined
            ? props.setShowAlert()
            : props.setShowAlert(props.disableBackButtonPress)
          : props.doesCloseBtnHasACallBack !== undefined
          ? props.setShowAlert()
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
        }}>
        {props.children}
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
              onPress={() =>
                props.doesCloseBtnHasACallBack !== undefined
                  ? props.setShowAlert()
                  : props.setShowAlert(false)
              }
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
      </View>
    </Modal>
  );
};

export default CustomAlert;
