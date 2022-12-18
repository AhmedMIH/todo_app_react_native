import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainRouter from './src/routes/AppNaviagtion';
import {Provider} from 'react-redux';
import store from './src/store'
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs()
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainRouter />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
