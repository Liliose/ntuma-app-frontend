import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {APP_COLORS} from '../../constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';

interface INotificationCounterPorps {
  iconSize?: number;
}

const NotificationsCounter = ({iconSize}: INotificationCounterPorps) => {
  const {notifications} = useSelector(
    (state: RootState) => state.notifications,
  );
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    let sub = true;
    if (sub) {
      const unread = notifications.filter(item => !item.isViewed);
      setCount(unread.length);
    }

    return () => {
      sub = false;
    };
  }, [notifications]);
  return (
    <View style={{position: 'relative'}}>
      <Icon
        name="bell"
        color={APP_COLORS.WHITE}
        size={iconSize !== undefined ? iconSize : 25}
      />
      {count > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -5,
            right: -5,
            backgroundColor: APP_COLORS.RED,
            borderRadius: 50,
            paddingVertical: 2,
            paddingHorizontal: 5,
            width: count.toString().length * 10 + 5,
            zIndex: 1,
          }}>
          <Text
            style={{
              color: APP_COLORS.WHITE,
              fontSize: 12,
              textAlign: 'center',
            }}>
            {count}
          </Text>
        </View>
      )}
    </View>
  );
};

export default NotificationsCounter;
