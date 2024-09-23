// Import necessary dependencies
import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavName } from './constants';
import { Splash } from '../screens';
import {useColorScheme} from 'react-native';
import BottomNavigation from './BottomNavigation';
//https://www.npmjs.com/package/@miblanchard/react-native-slider


const Stack = createStackNavigator();


 const Routes = (props) => {
    const scheme = useColorScheme();
    const MyTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;


    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName={NavName.BottomNavigation} >
                <Stack.Screen name={NavName.HOME} component={BottomNavigation} options={{ headerShown: false }} />
                <Stack.Screen name={NavName.SPLASH} component={Splash} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
