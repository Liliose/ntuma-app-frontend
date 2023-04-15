import {
  View,
  Text,
  Pressable,
  Alert,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {APP_COLORS} from '../../../../constants/colors';
import {
  btnWithBgContainerStyles,
  btnWithBgTextStyles,
  viewFlexCenter,
  viewFlexSpace,
} from '../../../../constants/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../reducers';
import {INavigationProp} from '../../../../../interfaces';
import {resetCart} from '../../../../actions/cart';
import {resetFavourites} from '../../../../actions/favourites';
import {setSelectedMarket} from '../../../../actions/markets';
import Modal from 'react-native-modal';
import ImageLoader from '../../../../components/image-loader';
import {app} from '../../../../constants/app';
import {setSelectedCategory} from '../../../../actions/categories';
import NotificationsCounter from '../../../../components/notification-counter';
import {t} from 'i18next';

const {height} = Dimensions.get('window');
const ProductTabsHeader = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {selectedMarket} = useSelector((state: RootState) => state.markets);
  const {categories} = useSelector((state: RootState) => state.categories);
  const [showModal, setShowModal] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const resetMarket = () => {
    Alert.alert(
      'Confirmation',
      'Do you want to switch to other markets? If yes, your cart and favourite items list will be removed too.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'confirm',
          onPress: () => {
            setShowModal(false);
            dispatch(resetCart());
            dispatch(resetFavourites());
            dispatch(setSelectedMarket(undefined));
            navigation.replace('SelectMarket');
          },
        },
      ],
      {cancelable: true},
    );
  };

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (showModal) {
        setTimeout(() => {
          setShowCategories(true);
        }, 1000);
      } else {
        setShowCategories(false);
      }
    }
    return () => {
      sub = false;
    };
  }, [showModal]);

  return (
    <>
      <View style={{padding: 10, backgroundColor: APP_COLORS.MAROON}}>
        <View style={[viewFlexSpace]}>
          <Pressable onPress={() => setShowModal(true)}>
            <Icon name="shopping-outline" size={25} color={APP_COLORS.WHITE} />
          </Pressable>
          <Pressable
            style={{flex: 1, marginHorizontal: 10}}
            onPress={() => setShowModal(true)}>
            <View
              style={[
                viewFlexCenter,
                {
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                },
              ]}>
              <Text
                style={{color: APP_COLORS.WHITE, fontSize: 20, marginRight: 10}}
                numberOfLines={1}>
                {selectedMarket?.name}
              </Text>
              <Icon2 name="angle-down" size={30} color={APP_COLORS.WHITE} />
            </View>
          </Pressable>
          <View style={[viewFlexSpace]}>
            <Pressable
              onPress={() => navigation.navigate('Notifications')}
              style={{marginHorizontal: 10}}>
              <NotificationsCounter />
            </Pressable>
            <Pressable
              style={{marginHorizontal: 10}}
              onPress={() => navigation.navigate('SearchProducts')}>
              <View>
                <Icon2 name="search" size={25} color={APP_COLORS.WHITE} />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
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
          <Pressable style={{marginBottom: 10}} onPress={resetMarket}>
            <View
              style={[
                viewFlexSpace,
                {
                  borderBottomColor: APP_COLORS.BORDER_COLOR,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                },
              ]}>
              <Text
                style={{
                  color: APP_COLORS.BLACK,
                  flex: 1,
                  fontWeight: '600',
                }}>
                {t('chooseDifferentMarketText')}
              </Text>
              <Icon2 name="angle-right" size={20} color={APP_COLORS.BLACK} />
            </View>
          </Pressable>
          <Text style={{color: APP_COLORS.BLACK}}>
            {t('chooseCategoryWithinText')}
          </Text>
          {!showCategories ? (
            <View style={[viewFlexCenter, {marginTop: 10}]}>
              <ActivityIndicator size={25} color={APP_COLORS.BLACK} />
            </View>
          ) : (
            <View style={{marginTop: 10, maxHeight: height / 2}}>
              <ScrollView>
                {categories.map((item, index) => (
                  <Pressable
                    key={index}
                    style={{marginBottom: 10}}
                    onPress={() => {
                      dispatch(setSelectedCategory(item));
                      navigation.navigate('category_' + item.id);
                      setShowModal(false);
                    }}>
                    <View style={[viewFlexSpace]}>
                      <ImageLoader
                        url={app.FILE_URL + item.image}
                        width={50}
                        height={50}
                        style={{borderRadius: 100}}
                      />
                      <Text
                        style={{
                          color: APP_COLORS.BLACK,
                          flex: 1,
                          marginHorizontal: 10,
                        }}>
                        {item.name}
                      </Text>
                      <Icon2
                        name="angle-right"
                        size={20}
                        color={APP_COLORS.BLACK}
                      />
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}
          <Pressable
            style={{marginTop: 10}}
            onPress={() => setShowModal(false)}>
            <View style={[btnWithBgContainerStyles]}>
              <Text style={[btnWithBgTextStyles]}>{t('closeText')}</Text>
            </View>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default ProductTabsHeader;
