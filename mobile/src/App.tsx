import React, { useEffect } from 'react';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Provider as StoreProvider } from 'react-redux';
import { ApplicationNavigator } from './navigation/ApplicationNavigator';
import { store } from './store/store';

export const App = () => {
  let [fontsLoaded] = useFonts({
    Regular: require('./assets/fonts/Montserrat-Regular.ttf'),
    Medium: require('./assets/fonts/Montserrat-Medium.ttf'),
    Light: require('./assets/fonts/Montserrat-Light.ttf'),
    Thin: require('./assets/fonts/Montserrat-Thin.ttf'),
    Bold: require('./assets/fonts/Montserrat-Bold.ttf'),
    Black: require('./assets/fonts/Montserrat-Black.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <StoreProvider store={store}>
      <ApplicationNavigator />
    </StoreProvider>
  );
};
