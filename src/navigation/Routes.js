// Import necessary dependencies
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavName } from './constants';
import { Splash } from '../screens';



const Stack = createStackNavigator();


 const Routes = (props) => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={NavName.SPLASH} >
                <Stack.Screen name={NavName.SPLASH} component={Splash} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
