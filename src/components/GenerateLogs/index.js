import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { DIMENSIONS, FLAG_TYPE, RACE_STATUS } from '../../utils/constants'
import scheduleService from '../../services/schedule'
import { getDriverNameUsingIndex, getEvent } from '../../utils/helper'
import moment from 'moment'
import CenteredModal from '../CenteredModal'
import raceStore from '../../store/RaceStore'
import { observer } from 'mobx-react-lite'



const GenerateLogs = () => {
  const { data, raceStats } = raceStore;
  const [actionModal, setActionModal] = useState(false);
  const toggleActionModal = () => setActionModal(prev => !prev);
  const { status } = raceStats;


  const raiseFlag = (flagType) => {
    switch (flagType) {
      case FLAG_TYPE.BLACK_FLAG:
        return raceStore.generateLogs();
      case FLAG_TYPE.REFUEL:
        return raceStore.generateLogs(FLAG_TYPE.REFUEL);
      case FLAG_TYPE.DRIVER_CHANGE:
        return raceStore.generateLogs(FLAG_TYPE.DRIVER_CHANGE);
      default:
        return null;
    }

  }





  return (
    <>
      {/* Start Race Button */}
      <View style={styles.lowerBtns}>
        {!status || status == RACE_STATUS.NOT_STARTED ? <TouchableOpacity style={styles.startButton} onPress={() => raceStore.startRace(true)}>
          <Text style={styles.buttonText}>Start Race</Text>
        </TouchableOpacity> : null}

        {<TouchableOpacity style={styles.startButton} onPress={toggleActionModal}>
          <Text style={styles.buttonText}>Take Action</Text>
        </TouchableOpacity>}
      </View>

      <TouchableOpacity style={[styles.startButton, { backgroundColor: '#4A9' }]} onPress={() => raiseFlag(FLAG_TYPE.GREEN_FLAG)} >
        <Text style={styles.buttonText}>Green Flag</Text>
      </TouchableOpacity>

      <CenteredModal visible={actionModal} animationType='slide' transparent={true} onClose={toggleActionModal}>
        <View style={styles.btns}>
          <TouchableOpacity style={[styles.startButton, { backgroundColor: '#000', borderWidth: 1, borderColor: '#999' }]} onPress={() => raiseFlag(FLAG_TYPE.BLACK_FLAG)} >
            <Text style={styles.buttonText}>Black Flag</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.startButton, { backgroundColor: '#FF5A5F' }]} onPress={() => raiseFlag(FLAG_TYPE.RED_FLAG)}>
            <Text style={styles.buttonText}>Red Flag</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.startButton, { backgroundColor: '#000', borderWidth: 1, borderColor: '#999' }]} onPress={() => raiseFlag(FLAG_TYPE.RED_FLAG)}>
            <Text style={styles.buttonText}>Refuel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.startButton, { backgroundColor: '#000', borderWidth: 1, borderColor: '#999' }]} onPress={() => raiseFlag(FLAG_TYPE.RED_FLAG)}>
            <Text style={styles.buttonText}>Change Driver</Text>
          </TouchableOpacity>
        </View>
      </CenteredModal>

    </>
  )
}

export default observer(GenerateLogs);

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 8,
    // width: (DIMENSIONS.WIDTH / 2) - 20,
    width: '48%',                // Each button takes up roughly half the width of the container
    marginBottom: 10,

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
  },
  lowerBtns: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10
  }


})