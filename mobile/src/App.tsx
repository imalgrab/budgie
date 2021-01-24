import React, { useEffect } from 'react';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { Provider as StoreProvider } from 'react-redux';
import { ApplicationNavigator } from './navigation/ApplicationNavigator';
import { store } from './store/store';

export const App = () => {
  let [fontsLoaded] = useFonts({
    Medium: require('./assets/fonts/Roboto-Medium.ttf'),
    Regular: require('./assets/fonts/Roboto-Regular.ttf'),
    Light: require('./assets/fonts/Roboto-Light.ttf'),
    Thin: require('./assets/fonts/Roboto-Thin.ttf'),
    Bold: require('./assets/fonts/Roboto-Bold.ttf'),
    Black: require('./assets/fonts/Roboto-Black.ttf'),
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
