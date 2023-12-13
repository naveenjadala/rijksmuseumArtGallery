import React, {useEffect} from 'react';
import TabNavigation from './src/Navigation/TabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {setupDatabase} from './src/DataBase/db';

const App = () => {
  // useEffect(() => {
  //   setupDatabase();
  // }, []);
  return (
    <PaperProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
