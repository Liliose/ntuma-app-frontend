import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Pressable, View, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Octicons';
import {INavigationProp} from '../../interfaces';
import {APP_COLORS} from '../constants/colors';
import {RootState} from '../reducers';
import Products from '../screens/home/products-tabs';
import Home from '../screens/home';
import Welcome from '../screens/welcome';
import SelectMarket from '../screens/select-market';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function Navigation() {
  function OrderTabs() {
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
    const {email} = useSelector((state: RootState) => state.user);
    const [activeColor, setActiveColor] = useState(APP_COLORS.MAROON);
    const [inactiveColor, setInactiveColor] = useState(APP_COLORS.BLACK);
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          headerShown: false,

          tabBarStyle: {
            backgroundColor: APP_COLORS.WHITE,
            height: 55,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={({route, navigation}) => ({
            headerShown: true,
            headerTitle: 'Home',
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('Search')}>
                <View style={{paddingRight: 10}}>
                  <Icon name="search" color={APP_COLORS.MAROON} size={30} />
                </View>
              </Pressable>
            ),
            headerTintColor: APP_COLORS.MAROON,
            tabBarItemStyle: {marginBottom: 10},
            tabBarLabelStyle: {fontSize: 14},
            tabBarIcon: ({focused, color, size}) => {
              return <Icon name="home" color={color} size={size} />;
            },
          })}
        />
        <Tab.Screen
          name="Ord"
          component={OrderTabs}
          options={{
            tabBarLabel: 'Orders',
            tabBarItemStyle: {marginBottom: 10},
            tabBarLabelStyle: {fontSize: 14},
            tabBarIcon: ({focused, color, size}) => {
              return <Icon name="cart" color={color} size={size} />;
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
                <Icon2
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
