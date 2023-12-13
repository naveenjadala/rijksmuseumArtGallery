import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FavoriteScreen from '../Screens/FavoriteScreens/FavoriteScreen';
import DetailsScreen from '../Screens/DetailsScreens/DetailsScreen';

const FavoritesStack = createNativeStackNavigator();
const FavoritesStackNav = () => {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        options={{headerShown: false}}
        component={FavoriteScreen}
        name="Favorites"
      />
      <FavoritesStack.Screen
        options={{headerShown: false}}
        component={DetailsScreen}
        name="Details"
      />
    </FavoritesStack.Navigator>
  );
};

export default FavoritesStackNav;
