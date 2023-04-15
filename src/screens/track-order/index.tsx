import {View, Text, ScrollView, Linking, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {APP_COLORS} from '../../constants/colors';
import {viewFlexCenter, viewFlexSpace} from '../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {
  IClient,
  INavigationPropWithRouteRequired,
  IOrder,
} from '../../../interfaces';
import TimeAgo from '@andordavoti/react-native-timeago';
import {fetchClients} from '../../actions/clients';

const TrackOrder = ({route, navigation}: INavigationPropWithRouteRequired) => {
  const dispatch = useDispatch();
  const {order} = route.params as {order: IOrder};
  const {orders} = useSelector((state: RootState) => state.orders);
  const {clients} = useSelector((state: RootState) => state.clients);
  const [orderToUse, setOrderToUse] = useState<IOrder | undefined>(undefined);
  const [agent, setAgent] = useState<IClient | undefined>(undefined);

  useEffect(() => {
    let sub = true;
    if (sub) {
      const od = orders.find(item => item.id === order.id);
      if (od) {
        setOrderToUse(od);
        const agnt = clients.find(item => item.agentId == order.agentId);
        if (agnt) {
          setAgent(agnt);
        }
      }
    }
    return () => {
      sub = false;
    };
  }, [order, orders, clients]);

  useEffect(() => {
    dispatch(fetchClients());
  }, []);

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: APP_COLORS.WHITE,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            borderLeftColor: APP_COLORS.MAROON,
            borderLeftWidth: 5,
            marginLeft: 15,
            paddingVertical: 10,
          }}>
          <View style={{marginLeft: -18, zIndex: 1, marginVertical: 10}}>
            <View style={[viewFlexSpace]}>
              <View
                style={{
                  backgroundColor: APP_COLORS.WHITE,
                  borderRadius: 100,
                }}>
                <Icon
                  name="check-circle"
                  color={
                    orderToUse?.deliveryStatus === 'COMPLETED'
                      ? APP_COLORS.MAROON
                      : APP_COLORS.LIGHT_BLACK
                  }
                  size={40}
                />
              </View>
              <View style={{flex: 1, marginLeft: 15}}>
                <Text style={{color: APP_COLORS.BLACK}}>Completed</Text>
                <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                  Shared delivery code to the driver to approve that the order
                  has reached at the address you specified.
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginLeft: -18, zIndex: 1, marginVertical: 10}}>
            <View style={[viewFlexSpace]}>
              <View
                style={{
                  backgroundColor: APP_COLORS.WHITE,
                  borderRadius: 100,
                }}>
                <Icon
                  name="check-circle"
                  color={
                    orderToUse?.deliveryStatus === 'COMPLETED'
                      ? APP_COLORS.MAROON
                      : APP_COLORS.LIGHT_BLACK
                  }
                  size={40}
                />
              </View>
              <View style={{flex: 1, marginLeft: 15}}>
                <Text style={{color: APP_COLORS.BLACK}}>On The Way</Text>
                <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                  Driver is on his way delivering your order
                </Text>
                {orderToUse !== undefined && orderToUse.riderId != null && (
                  <>
                    <TimeAgo
                      dateTo={new Date(orderToUse.sentAt)}
                      style={{color: APP_COLORS.TEXT_GRAY, marginTop: 10}}
                    />
                  </>
                )}
              </View>
            </View>
          </View>
          <View style={{marginLeft: -18, zIndex: 1, marginVertical: 10}}>
            <View style={[viewFlexSpace]}>
              <View
                style={{
                  backgroundColor: APP_COLORS.WHITE,
                  borderRadius: 100,
                }}>
                <Icon
                  name="check-circle"
                  color={
                    orderToUse?.riderId != null
                      ? APP_COLORS.MAROON
                      : APP_COLORS.LIGHT_BLACK
                  }
                  size={40}
                />
              </View>
              <View style={{flex: 1, marginLeft: 15}}>
                <Text style={{color: APP_COLORS.BLACK}}>
                  Processing The Order
                </Text>
                <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                  An agent at the market you choosed is looking for all the
                  products that you have requested. Same quantity, same quality!
                </Text>
                {orderToUse !== undefined && orderToUse?.agentId != null && (
                  <>
                    <TimeAgo
                      dateTo={new Date(orderToUse?.acceptedAt as any)}
                      style={{color: APP_COLORS.TEXT_GRAY, marginTop: 10}}
                    />
                    {agent !== undefined && (
                      <>
                        <View style={[viewFlexSpace]}>
                          <Text
                            style={{
                              color: APP_COLORS.BLACK,
                              flex: 1,
                              marginRight: 10,
                            }}>
                            {agent.names}
                          </Text>
                          <Pressable
                            onPress={() =>
                              navigation.navigate('ChatRoom', {
                                clientId: agent.agentId,
                              })
                            }>
                            <View style={[viewFlexCenter]}>
                              <Icon2
                                name="android-messages"
                                color={APP_COLORS.BLACK}
                                size={25}
                              />
                              <Text style={{color: APP_COLORS.BLACK}}>
                                Message
                              </Text>
                            </View>
                          </Pressable>
                          <Pressable
                            onPress={() => handleCall(agent.phone)}
                            style={{marginLeft: 10}}>
                            <View style={[viewFlexCenter]}>
                              <Icon3
                                name="phone-call"
                                color={APP_COLORS.BLACK}
                                size={25}
                              />
                              <Text style={{color: APP_COLORS.BLACK}}>
                                Call
                              </Text>
                            </View>
                          </Pressable>
                        </View>
                      </>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
          <View style={{marginLeft: -18, zIndex: 1, marginVertical: 10}}>
            <View style={[viewFlexSpace]}>
              <View
                style={{
                  backgroundColor: APP_COLORS.WHITE,
                  borderRadius: 100,
                }}>
                <Icon name="check-circle" color={APP_COLORS.MAROON} size={40} />
              </View>
              <View style={{flex: 1, marginLeft: 15}}>
                <Text style={{color: APP_COLORS.BLACK}}>Payment Done</Text>
                <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                  Successfully paid the order
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginLeft: -18, zIndex: 1, marginVertical: 10}}>
            <View style={[viewFlexSpace]}>
              <View
                style={{
                  backgroundColor: APP_COLORS.WHITE,
                  borderRadius: 100,
                }}>
                <Icon name="check-circle" color={APP_COLORS.MAROON} size={40} />
              </View>
              <View style={{flex: 1, marginLeft: 15}}>
                <Text style={{color: APP_COLORS.BLACK}}>Placed order</Text>
                <Text style={{color: APP_COLORS.TEXT_GRAY}}>
                  Specifying all the products that you want.
                </Text>
                {orderToUse !== undefined && (
                  <TimeAgo
                    dateTo={new Date(orderToUse?.createdAt as any)}
                    style={{color: APP_COLORS.TEXT_GRAY, marginTop: 10}}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TrackOrder;
