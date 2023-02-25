import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import Modal from 'react-native-modal';
import {APP_COLORS} from '../../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  commonInput,
  viewFlexSpace,
} from '../../../constants/styles';

interface IDepositProps {
  showModal: boolean;
  setShowModal: any;
}
const Deposit = ({showModal, setShowModal}: IDepositProps) => {
  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
      animationOutTiming={700}
      isVisible={showModal}
      onBackButtonPress={() => setShowModal(false)}
      style={{padding: 0, margin: 0}}>
      <View
        style={{
          backgroundColor: APP_COLORS.WHITE,
          marginRight: 20,
          marginLeft: 20,
          padding: 20,
          borderRadius: 10,
        }}>
        <View style={[viewFlexSpace]}>
          <Text
            style={{
              fontWeight: '700',
              marginBottom: 10,
              color: APP_COLORS.BLACK,
              fontSize: 16,
            }}>
            Make Deposit
          </Text>
          <View>
            <Pressable onPress={() => setShowModal(false)}>
              <Icon name="close" size={25} color={APP_COLORS.BLACK} />
            </Pressable>
          </View>
        </View>
        <View style={{marginTop: 5}}>
          <View style={{marginBottom: 10}}>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>Amount to deposit</Text>
            <TextInput
              style={[
                commonInput,
                {borderColor: APP_COLORS.PRODUCT_CARD_BORDER},
              ]}
              placeholder="Enter amount"
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{color: APP_COLORS.TEXT_GRAY}}>
              Payment phone number (MTN,AIRTEL-TIGO)
            </Text>
            <TextInput
              style={[
                commonInput,
                {borderColor: APP_COLORS.PRODUCT_CARD_BORDER},
              ]}
              placeholder="Ex:0788888888"
            />
          </View>
          <Pressable style={{marginBottom: 10, marginTop: 10}}>
            <View style={[btnWithBgContainerStyles]}>
              <Text style={[btnWithBgTextStyles]}>Deposit</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default Deposit;
