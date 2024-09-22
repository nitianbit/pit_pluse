import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import {
  createNavigationContainerRef
} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import Routes from './src/navigation/Routes';
import store from './src/redux/store';

export const navigationRef = createNavigationContainerRef();
const App = () => {
  const [routeName, setRouteName] = useState<string>('');
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#2892B4" />
      <View style={styles.container}>
        {/* <Login/> */}
        <Routes routeName={routeName} />
        <FlashMessage position="top" />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
// chmod 755 android/gradlew
