/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

//5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';

import AllScreensNavigation from './Navigation/AllScreensNavigation';


import { Provider } from 'react-redux';
import { persistor, store } from './Components/store/store';

import i18n from './Components/Localisation/i18n';
import { I18nextProvider } from 'react-i18next';
import { PersistGate } from 'redux-persist/integration/react';

import {useNotification} from './Notification/Notification';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useNotification();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AllScreensNavigation />
        </View>
      </I18nextProvider>
       </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
