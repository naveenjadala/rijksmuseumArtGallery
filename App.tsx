import React from 'react';
import TabNavigation from './src/Navigation/TabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {store} from './src/Redux/store';
import {Provider} from 'react-redux';

const App = () => {
  // useEffect(() => {
  //   setupDatabase();
  // }, []);
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
