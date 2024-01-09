import React, {useEffect} from 'react';
import TabNavigation from './src/Navigation/TabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {store} from './src/Redux/store';
import {Provider} from 'react-redux';
import {setupDatabase} from './src/DataBase/db';

const App = () => {
  useEffect(() => {
    setupDatabase();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
