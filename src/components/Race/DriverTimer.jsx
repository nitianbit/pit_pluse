import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProgressBar from '../ProgressBar'
import driverStore from '../../store/DriverStore'
import { observer } from 'mobx-react-lite'
import themeService from '../../store/themeStore'
import raceStore from '../../store/RaceStore'

const DriverTimer = (props) => {
    const { driver, driverId } = props;
    const { driverStats } = driverStore;
    const { currentDriver, stats } = driverStats;
    const { raceStats } = raceStore;
    const { duration } = (raceStats ?? {})
    const { themeConfig } = themeService;

    const getFilledValue = () => {
        // const totalDuration = stats[driverId]?.totalDrivingDuration ?? 0;
        const totalDuration = duration;
        const filledValue = stats[driverId]?.durationCovered ?? 0;
        const remainingTime = totalDuration - filledValue;

        return {
            filledPercentage: (filledValue / totalDuration) * 100,
            remainingTime: remainingTime > 0 ? remainingTime : 0,
            value: filledValue
        };
    }

    const { filledPercentage, remainingTime, value } = getFilledValue();

    return (
        <View style={[styles.participantRow, driverId === currentDriver && styles.selectedDriver]}>
            <ProgressBar time={value} fillColor={driverId === currentDriver ? themeConfig.dark_blue : '#ccc'}  fillPercent={filledPercentage} >
                <Text style={[styles.participantName, { color: themeConfig.text }]}>{driver.name ? driver.name : `Driver ${driverId + 1}`}</Text>
            </ProgressBar>
        </View>
    )
}

export default observer(DriverTimer);

const styles = StyleSheet.create({

    participantRow: {
        backgroundColor: '#333',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10
    },
    participantName: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        width: '65%'
    },
    selectedDriver: {
        // backgroundColor: '#4A90E2',
        // padding: 3,
        borderRadius: 10,
    },
})