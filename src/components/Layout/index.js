import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'

 

const Layout = ({ children, style = {} }) => {
    return (
        <View style={styles.outerView}>
            <SafeAreaView style={[styles.mainView, style]}>
                {children}
            </SafeAreaView>
        </View>
    )
}

export default Layout

const styles = StyleSheet.create({
    outerView: {
        backgroundColor: '#fff',
        flex: 1,
        alignSelf: 'center',
        width: '100%'
    },
    mainView: {
        // backgroundColor: 'red',
        flex: 1,
        paddingTop: 25,

    },
})