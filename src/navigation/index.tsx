import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Pressable, View, StatusBar, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import {INavigationProp} from '../../interfaces';
import {APP_COLORS} from '../constants/colors';
import {RootState} from '../reducers';
import Products from '../screens/home/products-tabs';
import Home from '../screens/home';
import Welcome from '../screens/welcome';
import SelectMarket from '../screens/select-market';
import ChooseCategory from '../screens/choose-category';
import ChooseCategoryHeader from '../screens/choose-category/choose-category-header';
import Favourites from '../screens/home/favourites';
import Dishes from '../screens/home/dishes';
import Messages from '../screens/home/messages';
import Cart from '../screens/home/cart';
import ProductTabsHeader from '../screens/home/products-tabs/product-tabs-header';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function Navigation() {
  function ProductsTabs() {
    return (
      <TopTab.Navigator
        initialRouteName="PendingOrders"
        screenOptions={{
          tabBarActiveTintColor: APP_COLORS.MAROON,
          tabBarInactiveTintColor: APP_COLORS.WHITE,
        }}>
        <TopTab.Screen
          options={{tabBarLabel: 'Pending'}}
          name="PendingOrders"
          component={Products}
        />
      </TopTab.Navigator>
    );
  }

  const HomeTabs = ({navigation}: INavigationProp) => {
    const [activeColor, setActiveColor] = useState(APP_COLORS.MAROON);
    const [inactiveColor, setInactiveColor] = useState(APP_COLORS.BLACK);
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: APP_COLORS.WHITE,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={ProductsTabs}
          options={({route, navigation}) => ({
            headerShown: true,
            headerTitle: '',
            header: () => <ProductTabsHeader />,
            headerTintColor: APP_COLORS.MAROON,
            tabBarIcon: ({focused, color, size}) => {
              return <Icon name="home" color={color} size={size} />;
            },
          })}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <Icon name="cart" color={color} size={size} />;
            },
          }}
        />

        <Tab.Screen
          name="Favourites"
          component={Favourites}
          options={{
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
          component={Messages}
          options={{
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
      <Stack.Navigator initialRouteName="Welcome">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
