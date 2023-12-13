import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../Screens/DetailsScreens/DetailsScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';

const HomeStack = createNativeStackNavigator();
const HomeStackNav = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{headerShown: false}}
        component={HomeScreen}
        name="Home"
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        component={DetailsScreen}
        name="Details"
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNav;
