import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { observer } from 'mobx-react-lite'
import { FuelIcon } from '../../assets/svgs';
import ProgressBar from '../ProgressBar';
import fuelStore from '../../store/FuelStore';
import themeService from '../../store/themeStore';

const FuelTimer = () => {
    const { fuelStats } = fuelStore;
    const { durationCovered, fuelDuration } = fuelStats
    const { themeConfig } = themeService;

    const getFilledValue = () => {
        const remainingTime = fuelDuration - durationCovered;

        return {
            filledPercentage: (remainingTime / fuelDuration) * 100,
            remainingTime: remainingTime > 0 ? remainingTime : 0
        };
    }

    const { filledPercentage, remainingTime } = getFilledValue();
 
    return (
        <>
            <ProgressBar time={remainingTime} fillColor={themeConfig.light_blue} fillPercent={filledPercentage} style={{ marginBottom: 20 }} >
                <FuelIcon fill={themeConfig.text}/>
            </ProgressBar>
        </>
    )
}

export default observer(FuelTimer);

const styles = StyleSheet.create({})