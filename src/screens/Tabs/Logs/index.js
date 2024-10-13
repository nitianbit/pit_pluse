import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DIMENSIONS } from '../../../utils/constants'
import { ThemeText } from '../../../components'

const Logs = () => {
  return (
    <SafeAreaView>
      <View style={styles.btns}>
        <TouchableOpacity style={styles.startButton} >
          <Text style={styles.buttonText}>Take Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.startButton, { backgroundColor: '#FF5A5F' }]} >
          <Text style={styles.buttonText}>Red Flag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.startButton, { backgroundColor: '#000', borderWidth: 1, borderColor: '#999' }]} >
          <Text style={styles.buttonText}>Black Flag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.startButton, { backgroundColor: '#4A9' }]} >
          <Text style={styles.buttonText}>Green Flag</Text>
        </TouchableOpacity>
      </View>

      <ThemeText style={styles.title} text="Race Logs" />

    </SafeAreaView>
  )
}

export default Logs

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: (DIMENSIONS.WIDTH / 2) - 5
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center'
  },
  btns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 20,
    borderBottomColor: '#999',
    borderBottomWidth: 1
  }
})