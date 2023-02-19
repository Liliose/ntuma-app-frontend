import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {APP_COLORS} from '../../constants/colors';
function FullPageLoader({isLoading}: {isLoading: boolean}) {
  return (
    <>
      <Modal
        animationIn="slideInUp"
        animationOut="fadeOut"
        animationOutTiming={700}
        isVisible={isLoading}
        backdropOpacity={0.1}
        style={{padding: 0, margin: 0}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={APP_COLORS.MAROON} size={70} />
        </View>
      </Modal>
    </>
  );
}

export default FullPageLoader;
