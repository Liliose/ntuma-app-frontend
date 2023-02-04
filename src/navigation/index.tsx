import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Pressable, View, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Octicons';
import {INavigationProp} from '../../interfaces';
import {APP_COLORS} from '../constants/colors';
import {RootState} from '../reducers';
import Products from '../screens/home/products-tabs';
import Home from '../screens/home';

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
      <StatusBar backgroundColor={APP_COLORS.MAROON} barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
