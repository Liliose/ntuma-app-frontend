import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loader from './loader';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {
  fetchMarkets,
  setIsHardReloadingMarkets,
  setSelectedMarket,
} from '../../actions/markets';
import {viewFlexCenter, viewFlexSpace} from '../../constants/styles';
import {app} from '../../constants/app';
import {APP_COLORS} from '../../constants/colors';
import WhiteCard from '../../components/white-card';
import Icon from 'react-native-vector-icons/FontAwesome';
import MarketStars from './market-stars';
import {IMarket, INavigationProp} from '../../../interfaces';
import ImageLoader from '../../components/image-loader';
import CustomAlert from '../../components/custom-alert';
import FastImage from 'react-native-fast-image';

const SelectMarket = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {markets, isLoading, loadingError} = useSelector(
    (state: RootState) => state.markets,
  );

  const [refreshing, setRefreshing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchMarkets());
  }, []);

  const handleSelectMarket = (item: IMarket) => {
    dispatch(setSelectedMarket(item));
    navigation.navigate('ChooseCategory');
  };

  useEffect(() => {
    let sub = true;
    if (sub) {
      loadingError.trim().length > 0 &&
        markets.length === 0 &&
        setShowAlert(true);
    }
    return () => {
      sub = false;
    };
  }, [loadingError]);

  useEffect(() => {
    let sub = true;
    if (sub) {
      !isLoading && refreshing && setRefreshing(false);
    }
    return () => {
      sub = false;
    };
  }, [isLoading]);

  const alertCallBack = () => {
    setShowAlert(false);
    dispatch(setIsHardReloadingMarkets(true));
    dispatch(fetchMarkets());
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(setIsHardReloadingMarkets(true));
    dispatch(fetchMarkets());
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <View style={{padding: 10, flex: 1, backgroundColor: APP_COLORS.WHITE}}>
          {isLoading && markets.length === 0 ? (
            <Loader />
          ) : (
            markets.map((item, i) => (
              <WhiteCard key={i} style={{padding: 10, marginBottom: 10}}>
                <View style={[viewFlexSpace]}>
                  <Pressable onPress={() => handleSelectMarket(item)}>
                    <ImageLoader
                      url={app.FILE_URL + item.image}
                      height={90}
                      width={90}
                      style={{borderRadius: 10}}
                    />
                  </Pressable>

                  <View style={{flex: 1, marginLeft: 10}}>
                    <Pressable onPress={() => handleSelectMarket(item)}>
                      <View style={[viewFlexSpace, {alignItems: 'flex-start'}]}>
                        <View style={{flex: 1, marginRight: 10}}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: APP_COLORS.BLACK,
                            }}>
                            {item.name}
                          </Text>
                          <MarketStars />
                          <View style={[viewFlexSpace]}>
                            <Icon
                              name="map-marker"
                              color="rgba(48, 47, 47, 0.8)"
                              size={20}
                            />
                            <Text
                              style={{
                                flex: 1,
                                marginLeft: 10,
                                color: APP_COLORS.TEXT_GRAY,
                              }}>
                              {item.address}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Icon
                            name="bookmark-o"
                            color={APP_COLORS.BLACK}
                            size={25}
                          />
                        </View>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </WhiteCard>
            ))
          )}
        </View>
      </ScrollView>
      <CustomAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        confirmationTitle="Try Again"
        callBack={alertCallBack}>
        <View style={[viewFlexCenter]}>
          <FastImage
            source={require('../../assets/error-black.gif')}
            style={{width: 120, height: 120}}
          />
          <Text
            style={{
              color: APP_COLORS.MAROON,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Something Went Wrong
          </Text>
          <Text style={{color: APP_COLORS.TEXT_GRAY}}>{loadingError}</Text>
        </View>
      </CustomAlert>
    </>
  );
};

export default SelectMarket;
