// Import necessary dependencies
import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavName } from './constants';
import { Splash } from '../screens';
import { useColorScheme } from 'react-native';
import BottomNavigation from './BottomNavigation';
import { observer } from 'mobx-react-lite';
import themeService, { THEME } from '../store/themeStore';
//https://www.npmjs.com/package/@miblanchard/react-native-slider


const Stack = createStackNavigator();


const Routes = (props) => {
    const scheme = useColorScheme();
    // const MyTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
    const { currentTheme } = themeService;
    const MyTheme = currentTheme === THEME.DARK ? DarkTheme : DefaultTheme;


    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName={NavName.SPLASH} >
                <Stack.Screen name={NavName.SPLASH} component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name={NavName.HOME} component={BottomNavigation} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default observer(Routes);
