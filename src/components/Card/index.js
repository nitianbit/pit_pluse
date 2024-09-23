import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useThemeColor from '../../hooks/useThemeColor';

const Card = ({ children }) => {
    const theme = useThemeColor();

    return <View style={[styles.cardSection, { backgroundColor: theme.card }]}>{children}</View>
};

export default Card

const styles = StyleSheet.create({
    cardSection: {
        marginBottom: 35,
        borderRadius: 10,
        overflow: 'hidden',
      },
})