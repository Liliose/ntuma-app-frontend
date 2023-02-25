import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {APP_COLORS} from '../../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {viewFlexCenter} from '../../constants/styles';
import Deposit from './deposit';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {currencyFormatter} from '../../helpers';
import {fetchWalletTransactions} from '../../actions/walletTransactions';
import FullPageLoader from '../../components/full-page-loader';
const {height} = Dimensions.get('window');

const Wallet = () => {
  const dispatch = useDispatch();
  const {walletAmounts} = useSelector((state: RootState) => state.user);
  const {isLoading, transactions} = useSelector(
    (state: RootState) => state.walletTransactions,
  );
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(fetchWalletTransactions());
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: APP_COLORS.WHITE}}>
      <View style={{height: height / 4, position: 'relative'}}>
        <View
          style={{
            backgroundColor: APP_COLORS.MAROON,
            height: 100,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}></View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            top: 0,
            marginHorizontal: 20,
          }}>
          <ImageBackground
            source={require('../../assets/wallet.png')}
            resizeMode="stretch">
            <View style={{height: 170, padding: 25}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: APP_COLORS.WHITE,
                }}>
                Available Balance
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: APP_COLORS.WHITE,
                  marginTop: 20,
                }}>
                {currencyFormatter(walletAmounts)} Rwf
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: 25,
                }}>
                <Pressable onPress={() => setShowModal(true)}>
                  <View style={[viewFlexCenter, {flexDirection: 'row'}]}>
                    <Icon
                      name="pluscircleo"
                      size={20}
                      color={APP_COLORS.WHITE}
                    />
                    <Text style={{color: APP_COLORS.WHITE, marginLeft: 10}}>
                      Deposit
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
          position: 'relative',
        }}>
        <ScrollView>
          <Text
            style={{fontSize: 18, color: APP_COLORS.BLACK, fontWeight: '600'}}>
            My Transactions
          </Text>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            marginBottom: 15,
            marginRight: 15,
          }}>
          <Pressable onPress={() => setShowModal(true)}>
            <Icon name="pluscircle" size={60} color={APP_COLORS.MAROON} />
          </Pressable>
        </View>
      </View>
      <Deposit showModal={showModal} setShowModal={setShowModal} />
      {/* <FullPageLoader isLoading={isLoading} /> */}
    </View>
  );
};

export default Wallet;
