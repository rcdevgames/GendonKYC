import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from 'react-native-toast-notifications';
import Router from './Router';
import {LoadingOverlay} from './Components';

export default () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#1f69ff" barStyle="light-content"/>
      <ToastProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </ToastProvider>
      <LoadingOverlay />
    </SafeAreaProvider>
  );
};
