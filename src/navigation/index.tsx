import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Pressable, View, StatusBar, Text, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/AntDesign';
import {INavigationProp} from '../../interfaces';
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
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function Navigation() {
  const loadData = useLoadBasiData();
  useEffect(() => {
    loadData();
  }, []);
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

  const HomeTabs = ({navigation}: INavigationProp) => {
    const [activeColor, setActiveColor] = useState(APP_COLORS.WHITE);
    const [inactiveColor, setInactiveColor] = useState('rgba(255,255,255,0.6)');
    const {cart} = useSelector((state: RootState) => state.cart);
    const {favourites} = useSelector((state: RootState) => state.favourites);
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
          options={
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
                  headerRight: () => (
                    <Pressable>
                      <View style={{marginRight: 15}}>
                        <Icon name="bell" size={25} color={APP_COLORS.WHITE} />
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
                  headerRight: () => (
                    <Pressable>
                      <View style={{marginRight: 15}}>
                        <Icon name="bell" size={25} color={APP_COLORS.WHITE} />
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
            title: 'Favourites List (' + favourites.length + ')',
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
            tabBarIcon: ({focused, color, size}) => {
              return <Icon2 name="restaurant-menu" color={color} size={size} />;
            },
          }}
        />

        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <Icon2 name="message" color={color} size={size} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
            headerStyle: {backgroundColor: APP_COLORS.MAROON},
            tabBarIcon: ({focused, color, size}) => {
              return <Icon4 name="user-alt" color={color} size={size} />;
            },
          }}
        />

        {/* <Tab.Screen
              name="Peoples"
              component={People}
              options={{
                tabBarIcon: ({focused, color, size}) => {
                  return <Icon name="people" color={color} size={size} />;
                },
              }}
              listeners={{
                tabPress: e => {
                  e.preventDefault();
                  navigation.navigate('People');
                },
              }}
            /> */}
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={APP_COLORS.MAROON} barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          // headerMode: 'float',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectMarket"
          component={SelectMarket}
          options={({route, navigation}: INavigationProp) => ({
            headerRight: () => (
              <>
                <Icon3 name="search" size={25} color={APP_COLORS.WHITE} />
              </>
            ),
            headerRightContainerStyle: {paddingRight: 20},
            title: 'Select Market',
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
          })}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={({route, navigation}: INavigationProp) => ({
            title: 'Login',
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
          })}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={({route, navigation}: INavigationProp) => ({
            title: 'Sign up',
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
          })}
        />
        <Stack.Screen
          name="Locations"
          component={Locations}
          options={({route, navigation}: INavigationProp) => ({
            title: 'Saved locations',
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTintColor: APP_COLORS.WHITE,
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('AddLocation')}>
                <View style={[viewFlexSpace, {marginRight: 15}]}>
                  <Icon5 name="plus" size={25} color={APP_COLORS.WHITE} />
                  <Text style={{color: APP_COLORS.WHITE, marginLeft: 10}}>
                    Add New
                  </Text>
                </View>
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="AddLocation"
          component={AddLocation}
          options={({route, navigation}: INavigationProp) => ({
            title: 'Add New Location',
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
          })}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={({route, navigation}: INavigationProp) => ({
            headerRight: () => (
              <Pressable>
                <View style={{marginRight: 15}}>
                  <Icon name="bell" size={25} color={APP_COLORS.WHITE} />
                </View>
              </Pressable>
            ),
            title: 'Checkout',
            headerStyle: {
              backgroundColor: APP_COLORS.MAROON,
            },
            headerTitleAlign: 'center',
            headerTintColor: APP_COLORS.WHITE,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
