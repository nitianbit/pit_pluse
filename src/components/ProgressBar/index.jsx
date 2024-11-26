import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemeText from '../ThemeText'
import { formatTime } from '../../utils/helper'

const ProgressBar = ({ time, children, fillColor, fillPercent = '100',style={} }) => {
    const customStyle=StyleSheet.flatten([styles.timerBox,style])
    return (
        <View style={customStyle}>
            {/* <View style={[styles.fill, { width: `${raceProgress}%`, backgroundColor: '#4A90E2' }]} /> */}
            <View style={[styles.fill, { width: `${fillPercent}%`, backgroundColor: fillColor }]} />
            <View style={styles.contentContainer}>
                {children}
                <Text style={styles.timerText}>{formatTime(time)}</Text>
            </View>
        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    timerBox: {
        padding: 15,
        paddingHorizontal: 0,
        borderRadius: 10,
        justifyContent: 'center',
        overflow: 'hidden', // Ensure the fill doesn't overflow outside the box
        backgroundColor: '#333', // Background for the timer box,

    },
    fill: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
    },
    contentContainer: {
        zIndex: 999, // Ensure text is above the fill
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    timerText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
})