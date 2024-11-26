import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme } from '@react-navigation/native'

 

const Layout = ({ children, style = {} }) => {
    const t=useTheme();

    return (
        <View style={styles.outerView}>
            <SafeAreaView style={[styles.mainView, style,{backgroundColor:t.colors.background}]}>
                {children}
            </SafeAreaView>
        </View>
    )
}

export default Layout

const styles = StyleSheet.create({
    outerView: {
        // backgroundColor: '#fff',
        flex: 1,
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal:10
    },
    mainView: {
        // backgroundColor: 'red',
        flex: 1,
        paddingTop: 25,

    },
})