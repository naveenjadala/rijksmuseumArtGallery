import React from 'react';
import TabNavigation from './src/Navigation/TabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
