import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation} from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {
    FlagSvg,
    ResetSvg,
    ScheduleSvg,
    SetupSvg,
    TimerSvg
} from '../assets/svgs';
import { Race, Reset, Schedule, Setup, Stint } from '../screens';
import { COLORS } from '../utils/constants';
import { NavName } from './constants';

const Tab = createBottomTabNavigator();

const data = [
    {
        name: NavName.SETUP,
        title: 'Setup',
        Icon: SetupSvg,
        component: Setup
    },
    {
        name: NavName.RACE,
        title: 'Race',
        Icon: FlagSvg,
        component: Race
    },
    {
        name: NavName.STINT,
        title: 'Stint',
        Icon: TimerSvg,
        component: Stint
    },
    {
        name: NavName.SCHEDULE,
        title: 'Schedule',
        Icon: ScheduleSvg,
        component: Schedule
    },
    {
        name: NavName.RESET,
        title: 'Reset', 
        Icon: ResetSvg,
        component: Reset
    }
]       

const BottomNavigation = () => {
    const navigation = useNavigation(); 

    return (
        <Tab.Navigator initialRouteName={NavName.SETUP}>
             {data.map((item, index) => (
                <Tab.Screen
                    key={index}
                    name={item.name}
                    component={item.component}
                    options={{
                        headerShown: false,
                        unmountOnBlur: true,
                        tabBarActiveTintColor: 'blue',
                        tabBarIcon: ({ focused }) => (
                            <item.Icon
                                color={
                                    focused
                                        ? COLORS.BOTTOM_ACTIVE_COLOR
                                        : COLORS.ACCENT
                                }    
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={focused ? styles.active : styles.inactive}>{item.title}</Text>
                        ),
                        tabBarStyle: styles.tabBarStyle
                    }}
                />
            ))}
         </Tab.Navigator>   
    )
};

export default BottomNavigation;

const styles = StyleSheet.create({
    active: {
        color: COLORS.BOTTOM_ACTIVE_COLOR,
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 12,
    },
    inactive: {
        color: COLORS.ACCENT,
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 12,
    },
    tabBarStyle: {
        display: 'flex',
        paddingTop: 20,
        height: 80,
        paddingBottom: 20,
     },
 
});
