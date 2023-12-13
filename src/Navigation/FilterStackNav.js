import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../Screens/DetailsScreens/DetailsScreen';
import FilterScreen from '../Screens/FilterScreens/FilterScreen';

const FilterStack = createNativeStackNavigator();
const FilterStackNav = () => {
  return (
    <FilterStack.Navigator>
      <FilterStack.Screen
        options={{headerShown: false}}
        component={FilterScreen}
        name="Home"
      />
      <FilterStack.Screen
        options={{headerShown: false}}
        component={DetailsScreen}
        name="Details"
      />
    </FilterStack.Navigator>
  );
};

export default FilterStackNav;
