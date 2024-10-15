import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DIMENSIONS } from '../../../utils/constants'
import { ThemeText } from '../../../components'

const Logs = () => {
  return (
    <SafeAreaView>
      <ThemeText style={styles.title} text="Race Logs" />
    </SafeAreaView>
  )
}

export default Logs

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 20,
    borderBottomColor: '#999',
    borderBottomWidth: 1
  }
})