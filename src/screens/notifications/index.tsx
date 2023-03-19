import {View, Text} from 'react-native';
import React from 'react';
import {APP_COLORS} from '../../constants/colors';
import NotFound from '../../components/not-found';

const Notifications = () => {
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.MAROON}}>
      <NotFound
        title="No data found"
        textColor={APP_COLORS.WHITE}
        lightImage={true}
      />
    </View>
  );
};

export default Notifications;
