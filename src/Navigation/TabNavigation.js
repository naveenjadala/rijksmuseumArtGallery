import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeStackNav from './HomeStackNav';
import FavoritesStackNav from './FavoritesStackNav';
import FilterStackNav from './FilterStackNav';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import {Image, Platform} from 'react-native';
import HomeIcon from '../assets/Images/home.png';
import LikeIcon from '../assets/Images/like.png';
import FilterIcon from '../assets/Images/filter.png';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        component={HomeStackNav}
        name="HomeStack"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: 'Home',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) =>
            Platform.OS === 'ios' ? (
              <Image source={HomeIcon} style={{height: 20, width: 20}} />
            ) : (
              <Icon name="home" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        component={FavoritesStackNav}
        name="FavoritesStack"
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Favorites',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) =>
            Platform.OS === 'ios' ? (
              <Image source={LikeIcon} style={{height: 20, width: 20}} />
            ) : (
              <Icon name="favorite" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        component={FilterStackNav}
        name="FiltersStack"
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Filters',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) =>
            Platform.OS === 'ios' ? (
              <Image source={FilterIcon} style={{height: 20, width: 20}} />
            ) : (
              <Icon name="filter-list" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Profile',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
