import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProgressBar from '../ProgressBar'
import raceStore from '../../store/RaceStore';
import { observer } from 'mobx-react-lite';
import { FlagDotted } from '../../assets/svgs';

const RaceTimer = () => {
    const { raceStats } = raceStore;
    const { duration, durationCovered } = (raceStats ?? {});//trip duration 

    const getFilledValue = () => {
        const totalDuration = duration ;
        const filledValue = durationCovered;
        const remainingTime=totalDuration - filledValue;
       
        return {
            filledPercentage: (remainingTime / totalDuration) * 100,
            remainingTime:remainingTime>0?remainingTime:0
        };
    }

    const { filledPercentage, remainingTime } = getFilledValue();

    return (
        <>
            {/* Progress Bar */}
            <ProgressBar time={remainingTime} fillColor='#4A90E2' fillPercent={filledPercentage} style={{ marginBottom: 20 }} >
                <FlagDotted />
            </ProgressBar>
        </>
    )
}

export default observer(RaceTimer);

const styles = StyleSheet.create({})