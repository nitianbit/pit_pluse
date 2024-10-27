import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useThemeColor from '../../hooks/useThemeColor';
import { useTheme } from '@react-navigation/native';

const Card = ({ children }) => {
    const theme = useThemeColor();
    const t=useTheme();

    return <View style={[styles.cardSection, { backgroundColor: t.colors.card }]}>{children}</View>
};

export default Card

const styles = StyleSheet.create({
    cardSection: {
        marginBottom: 35,
        borderRadius: 10,
        overflow: 'hidden',
      },
})