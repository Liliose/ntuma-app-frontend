import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Pressable, View, StatusBar, Text, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/AntDesign';
import {INavigationProp, PAYMENT_STATUS_ENUM} from '../../interfaces';
import {APP_COLORS} from '../constants/colors';
import {RootState} from '../reducers';
import Products from '../screens/home/products-tabs';
import Welcome from '../screens/welcome';
import SelectMarket from '../screens/select-market';
import ChooseCategory from '../screens/choose-category';
import ChooseCategoryHeader from '../screens/choose-category/choose-category-header';
import Favourites from '../screens/home/favourites';
import Dishes from '../screens/home/dishes';
import Messages from '../screens/home/messages';
import Cart from '../screens/home/cart';
import ProductTabsHeader from '../screens/home/products-tabs/product-tabs-header';
import {useLoadBasiData} from '../helpers';
import Login from '../screens/login';
import Register from '../screens/register/register';
import Profile from '../screens/home/profile';
import Locations from '../screens/locations';
import AddLocation from '../screens/add-location';
import {viewFlexSpace} from '../constants/styles';
import Checkout from '../screens/checkout';
import PendingOrders from '../screens/orders/pending-orders';
import OrderPreview from '../screens/orders/preview';
import FailedOrders from '../screens/orders/failed-orders';
import CompletedOrders from '../screens/orders/completed-orders';
import Wallet from '../screens/wallet';
import {fetchWalletTransactions} from '../actions/walletTransactions';
import DishDetails from '../screens/home/dish-details';
import Notifications from '../screens/notifications';
import SearchMarkets from '../screens/search-markets';
import SearchMarketsHeader from '../screens/search-markets/search-markets-header';
import SearchProducts from '../screens/search-products';
import SearchProductsHeader from '../screens/search-products/search-products-header';
import {setShowClearAllNotificatonsConfirmation} from '../actions/notifications';
import ChattRoom from '../screens/chat-room';
import ChattRoomHeader from '../screens/chat-room/header';
import ViewAndSendSelectedFile from '../screens/chat-room/view-and-send-selected-file';
import ImagePreview from '../screens/chat-room/image-preview';
import UpdateUserInfo from '../screens/update-user-info';
import ChangePassword from '../screens/change-password';
import AccountSettings from '../screens/account-settings';
import NotificationsCounter from '../components/notification-counter';
import DeleteAccount from '../screens/delete-account';
import HelpAndSupport from '../screens/help-and-support';
import TrackOrder from '../screens/track-order';
import ChangeLanguage from '../screens/change-language';
import {t} from 'i18next';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function ProductsTabs() {
  const {categories, selectedCategory} = useSelector(
    (state: RootState) => state.categories,
  );
  return (
    <TopTab.Navigator
      initialRouteName={'category_' + selectedCategory?.id}
      screenOptions={{
        tabBarActiveTintColor: APP_COLORS.BLACK,
        tabBarInactiveTintColor: APP_COLORS.WHITE,
        tabBarIndicatorContainerStyle: {backgroundColor: APP_COLORS.MAROON},
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
          height: '100%',
        },
        tabBarLabelStyle: {textTransform: 'capitalize'},
        tabBarScrollEnabled: true,
        tabBarItemStyle: {width: 100, flex: 1},
      }}>
      {categories.map((item, i) => (
        <TopTab.Screen
          key={i}
          options={{
            tabBarLabel: item.name,
          }}
          name={'category_' + item.id}
          component={Products}
        />
      ))}
    </TopTab.Navigator>
  );
}

function OrdersTab() {
  return (
    <TopTab.Navigator
      // initialRouteName=""
      screenOptions={{
        tabBarActiveTintColor: APP_COLORS.WHITE,
        tabBarInactiveTintColor: APP_COLORS.WHITE,
        tabBarIndicatorContainerStyle: {backgroundColor: APP_COLORS.MAROON},
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
          height: 5,
        },
        tabBarLabelStyle: {textTransform: 'capitalize'},
      }}>
      <TopTab.Screen
        options={{
          tabBarLabel: 'Pending',
        }}
        name="PendingOrders"
        component={PendingOrders}
      />
      {/* <TopTab.Screen
        options={{
          tabBarLabel: 'Schedured',
        }}
        name="ScheduledOrders"
        component={PendingOrders}
      /> */}
      <TopTab.Screen
        options={{
          tabBarLabel: 'Failed',
        }}
        name="FailedOrders"
        component={FailedOrders}
      />
      <TopTab.Screen
        options={{
          tabBarLabel: 'Completed',
        }}
        name="CompletedOrders"
        component={CompletedOrders}
      />
    </TopTab.Navigator>
  );
}

const HomeTabs = ({navigation}: INavigationProp) => {
  const [activeColor, setActiveColor] = useState(APP_COLORS.WHITE);
  const [inactiveColor, setInactiveColor] = useState('rgba(255,255,255,0.6)');
  const {cart} = useSelector((state: RootState) => state.cart);
  const {favourites} = useSelector((state: RootState) => state.favourites);

  const dishestext = t('hotDishesText');
  const profiletext = t('profileText');
  const carttext = t('cartText');
  const favouritetext = t('favouriteListText');
  const messagestext = t('messagesText');

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: APP_COLORS.MAROON,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={ProductsTabs}
        options={({route, navigation}) => ({
          headerShown: true,
          headerTitle: '',
          header: () => <ProductTabsHeader navigation={navigation} />,
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="home" color={color} size={size} />;
          },
        })}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={({route, navigation}) =>
          cart.length > 0
            ? {
                tabBarBadge: cart.length,
                tabBarIcon: ({focused, color, size}) => {
                  return <Icon name="cart" color={color} size={size} />;
                },
                headerShown: true,
                headerTintColor: APP_COLORS.WHITE,
                headerStyle: {backgroundColor: APP_COLORS.MAROON},
                headerTitleAlign: 'center',
                title: carttext,
                headerRight: () => (
                  <Pressable
                    onPress={() => navigation.navigate('Notifications')}>
                    <View style={{marginRight: 15}}>
                      <NotificationsCounter />
                    </View>
                  </Pressable>
                ),
              }
            : {
                tabBarIcon: ({focused, color, size}) => {
                  return <Icon name="cart" color={color} size={size} />;
                },
                headerShown: true,
                headerTintColor: APP_COLORS.WHITE,
                headerStyle: {backgroundColor: APP_COLORS.MAROON},
                headerTitleAlign: 'center',
                title: carttext,
                headerRight: () => (
                  <Pressable
                    onPress={() => navigation.navigate('Notifications')}>
                    <View style={{marginRight: 15}}>
                      <NotificationsCounter />
                    </View>
                  </Pressable>
                ),
              }
        }
      />

      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          headerShown: true,
          title: favouritetext + ' (' + favourites.length + ')',
          headerStyle: {backgroundColor: APP_COLORS.MAROON},
          headerTintColor: APP_COLORS.WHITE,
          headerTitleAlign: 'center',
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="heart" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="Dishes"
        component={Dishes}
        options={{
          title: '🔥' + dishestext + '😋',
          headerShown: true,
          headerStyle: {backgroundColor: APP_COLORS.MAROON},
          headerTintColor: APP_COLORS.WHITE,
          headerTitleAlign: 'center',
          tabBarIcon: ({focused, color, size}) => {
            return <Icon2 name="restaurant-menu" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          title: messagestext,
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: APP_COLORS.WHITE,
          headerStyle: {backgroundColor: APP_COLORS.MAROON},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon2 name="message" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: profiletext,
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: APP_COLORS.WHITE,
          headerStyle: {backgroundColor: APP_COLORS.MAROON},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon4 name="user-alt" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

function Navigation() {
  const dispatch = useDispatch();
  const loadData = useLoadBasiData();
  const {token} = useSelector((state: RootState) => state.user);
  const initScreen = token.trim() === '' ? 'Welcome' : 'SelectMarket';
  const [initialRoute, setInitialRoute] = useState(initScreen);
  useEffect(() => {
    loadData();

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage.notification,
          // );
          if (remoteMessage?.data?.type) {
            setInitialRoute(remoteMessage.data.type); // navigate to this screen
          }
        }
      });
  }, []);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={APP_COLORS.MAROON} barStyle="light-content" />
      <Stack.Navigator
        initialRouteName={initialRoute}
        // screenOptions={{
        //   // headerMode: 'float',
        //   // gestureEnabled: true,
        //   // gestureDirection: 'horizontal',
        //   // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        //   cardStyleInterpolator:
        //     CardStyleInterpolators.forFadeFromBottomAndroid,
        // }}
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="Orders"
          component={OrdersTab}
          options={{
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            title: t('orderHistoryText') as string,
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen
          name="SelectMarket"
          component={SelectMarket}
          options={({route, navigation}: INavigationProp) => ({
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('SearchMarkets')}>
                <Icon3 name="search" size={25} color={APP_COLORS.WHITE} />
              </Pressable>
            ),
            headerRightContainerStyle: {paddingRight: 20},
            title: t('selectMarketText') as string,
            headerTintColor: APP_COLORS.WHITE,
            headerStyle: {backgroundColor: APP_COLORS.MAROON},

            headerLeft: () => (
              <>
                <Icon
                  name="shopping-outline"
                  size={25}
                  color={APP_COLORS.WHITE}
                />
              </>
            ),
            headerLeftContainerStyle: {
              paddingHorizontal: 10,
            },
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          })}
        />
        <Stack.Screen
          name="SearchMarkets"
          component={SearchMarkets}
          options={({route, navigation}: INavigationProp) => ({
            headerTitle: () => <SearchMarketsHeader />,
            headerTintColor: APP_COLORS.WHITE,
            headerStyle: {backgroundColor: APP_COLORS.MAROON},
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          })}
        />
        <Stack.Screen
          name="ChooseCategory"
          component={ChooseCategory}
          options={({route, navigation}: INavigationProp) => ({
            title: '',
            headerStyle: {backgroundColor: APP_COLORS.MAROON},
            headerTintColor: APP_COLORS.WHITE,
            header: () => <ChooseCategoryHeader navigation={navigation} />,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          })}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={({route, navigation}: INavigationProp) => ({
            title: t('signinText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          })}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={({route, navigation}: INavigationProp) => ({
            title: t('signupText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          })}
        />
        <Stack.Screen
          name="Locations"
          component={Locations}
          options={({route, navigation}: INavigationProp) => ({
            title: t('savedLocationsText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTintColor: APP_COLORS.WHITE,
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('AddLocation')}>
                <View style={[viewFlexSpace, {marginRight: 15}]}>
                  <Icon5 name="plus" size={25} color={APP_COLORS.WHITE} />
                  <Text style={{color: APP_COLORS.WHITE, marginLeft: 10}}>
                    {t('addNewText')}
                  </Text>
                </View>
              </Pressable>
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="AddLocation"
          component={AddLocation}
          options={({route, navigation}: INavigationProp) => ({
            title: t('addNewLocationText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          })}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={({route, navigation}: INavigationProp) => ({
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('Notifications')}>
                <View style={{marginRight: 15}}>
                  <NotificationsCounter />
                </View>
              </Pressable>
            ),
            title: t('checkoutText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          })}
        />
        <Stack.Screen
          name="OrderPreview"
          component={OrderPreview}
          options={({route, navigation}: INavigationProp) => ({
            title: t('orderInformationText') as string,
            headerRight: () =>
              route?.params?.order?.paymentStatus ===
              PAYMENT_STATUS_ENUM.SUCCESS ? (
                <Pressable
                  onPress={() =>
                    navigation.navigate('TrackOrder', {
                      order: route?.params?.order,
                    })
                  }>
                  <View style={[viewFlexSpace, {paddingRight: 10}]}>
                    <Icon2
                      name="track-changes"
                      color={APP_COLORS.WHITE}
                      size={20}
                    />
                    <Text style={{color: APP_COLORS.WHITE, marginLeft: 5}}>
                      Track Order
                    </Text>
                  </View>
                </Pressable>
              ) : (
                <></>
              ),
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'left',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={({route, navigation}: INavigationProp) => ({
            title: t('myWalletText') as string,
            headerRight: () => (
              <Pressable onPress={() => dispatch(fetchWalletTransactions())}>
                <View style={{paddingRight: 10}}>
                  <Icon5 name="reload1" size={25} color={APP_COLORS.WHITE} />
                </View>
              </Pressable>
            ),
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="DishDetails"
          component={DishDetails}
          options={({route, navigation}: INavigationProp) => ({
            title: 'Details',
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('Notifications')}>
                <View style={{paddingRight: 10}}>
                  <Icon name="bell" size={25} color={APP_COLORS.WHITE} />
                </View>
              </Pressable>
            ),
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          })}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={({route, navigation}: INavigationProp) => ({
            title: 'Notifications',
            headerRight: () => (
              <Pressable
                onPress={() =>
                  dispatch(setShowClearAllNotificatonsConfirmation(true))
                }>
                <View style={{paddingRight: 10}}>
                  <Text style={{color: APP_COLORS.WHITE}}>
                    {t('clearAllText')}
                  </Text>
                </View>
              </Pressable>
            ),
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerShadowVisible: false,
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          })}
        />
        <Stack.Screen
          name="SearchProducts"
          component={SearchProducts}
          options={({route, navigation}: INavigationProp) => ({
            headerTitle: () => <SearchProductsHeader />,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerShadowVisible: false,
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChattRoom}
          options={({route, navigation}: INavigationProp) => ({
            title: '',
            headerTitle: () => (
              <ChattRoomHeader route={route as any} navigation={navigation} />
            ),
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          })}
        />
        <Stack.Screen
          name="ImageBeforeSendPreview"
          component={ViewAndSendSelectedFile}
          options={({route, navigation}: INavigationProp) => ({
            title: t('sendFileText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="ImagePreview"
          component={ImagePreview}
          options={({route, navigation}: INavigationProp) => ({
            title: new Date(route?.params?.message?.createdAt).toUTCString(),
            headerStyle: {
              backgroundColor: APP_COLORS.BLACK,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="AccountSettings"
          component={AccountSettings}
          options={({route, navigation}: INavigationProp) => ({
            title: t('accountSettingsText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="UpdateUserInfo"
          component={UpdateUserInfo}
          options={({route, navigation}: INavigationProp) => ({
            title: t('updatePersonalInfoText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={({route, navigation}: INavigationProp) => ({
            title: t('changePasswordText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="DeleteAccount"
          component={DeleteAccount}
          options={({route, navigation}: INavigationProp) => ({
            title: t('deleteAccountText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="HelpAndSupport"
          component={HelpAndSupport}
          options={({route, navigation}: INavigationProp) => ({
            title: t('helpAndSupportText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="TrackOrder"
          component={TrackOrder}
          options={({route, navigation}: INavigationProp) => ({
            title: 'Track Order #' + route?.params?.order?.id,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <Stack.Screen
          name="ChangeLanguage"
          component={ChangeLanguage}
          options={({route, navigation}: INavigationProp) => ({
            title: t('changeLanguageText') as string,
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
