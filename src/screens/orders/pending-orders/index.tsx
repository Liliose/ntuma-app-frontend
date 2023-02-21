import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {APP_COLORS} from '../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import WhiteCard from '../../../components/white-card';
import {viewFlexCenter, viewFlexSpace} from '../../../constants/styles';
import {RootState} from '../../../reducers';
import Loader from '../loader';
import {INavigationProp, PAYMENT_STATUS_ENUM} from '../../../../interfaces';
import NotFound from '../../../components/not-found';
import {fetchOrders} from '../../../actions/orders';
import Item from './item';

const PendingOrders = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {orders, isLoading} = useSelector((state: RootState) => state.orders);
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_COLORS.WHITE,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>
      {isLoading && orders.length === 0 ? (
        <Loader />
      ) : orders.filter(
          item => item.paymentStatus === PAYMENT_STATUS_ENUM.PENDING,
        ).length > 0 ? (
        orders
          .filter(item => item.paymentStatus === PAYMENT_STATUS_ENUM.PENDING)
          .map((item, index) => (
            <Item item={item} key={index} navigation={navigation} />
          ))
      ) : (
        <NotFound title="You don't have any pending order" />
      )}
    </View>
  );
};

export default PendingOrders;
