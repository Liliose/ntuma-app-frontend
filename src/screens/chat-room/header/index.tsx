import {View, Text, Pressable, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  IClient,
  INavigationPropWithRouteRequired,
} from '../../../../interfaces';
import {viewFlexSpace} from '../../../constants/styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import {APP_COLORS} from '../../../constants/colors';
import UserImage from '../../../components/user-image';
import Icon from 'react-native-vector-icons/Feather';
const ChattRoomHeader = ({
  navigation,
  route,
}: INavigationPropWithRouteRequired) => {
  const {clientId} = route.params as {clientId: number};
  const [client, setClient] = useState<IClient | undefined>(undefined);

  const {clients} = useSelector((state: RootState) => state.clients);
  useEffect(() => {
    const cl = clients.find(item => Number(item.agentId) === clientId);
    if (cl) {
      setClient(cl);
    }
  }, []);

  const handleCall = () => {
    if (client?.phone) {
      Linking.openURL(`tel:${client.phone}`);
    }
  };

  return (
    <View style={[viewFlexSpace, {width: '100%', paddingLeft: 10}]}>
      {client !== undefined && (
        <UserImage
          image={client.image}
          bgColor={APP_COLORS.DARK_GRAY}
          iconColor={APP_COLORS.MAROON}
        />
      )}
      <Text
        style={{color: APP_COLORS.WHITE, marginHorizontal: 10, flex: 1}}
        numberOfLines={1}>
        {client?.names}
      </Text>
      <Pressable onPress={() => handleCall()}>
        <View>
          <Icon name="phone-call" size={25} color={APP_COLORS.WHITE} />
        </View>
      </Pressable>
    </View>
  );
};

export default ChattRoomHeader;
