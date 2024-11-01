import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { DIMENSIONS, FLAG_TYPE, RACE_STATUS } from '../../utils/constants'
import scheduleService from '../../services/schedule'
import { getDriverNameUsingIndex, getEvent } from '../../utils/helper'
import moment from 'moment'
import CenteredModal from '../CenteredModal'
import raceStore from '../../store/RaceStore'
import { observer } from 'mobx-react-lite'
import driverStore from '../../store/DriverStore'
import fuelStore from '../../store/FuelStore'
import { showMessage } from 'react-native-flash-message'
import DriverChangePopup from '../DriverChangePopup'
import PitStop from '../PitStop'



const GenerateLogs = () => {
  const { data, raceStats ,flags,schedule} = raceStore;
  const [actionModal, setActionModal] = useState(false);
  const toggleActionModal = () => setActionModal(prev =>  !prev);
  const { status } = raceStats;
  const {driverStats}=driverStore;
  const {currentDriver}=driverStats;
  const [changeDriverModal,setChangeDriverModel]=useState(false);
  const toggleChangeDriverModal=()=>setChangeDriverModel(prev=>!prev);
  const [flagKind,setFlagKind]=useState(null);//to handle driver change and refuel both simultaneouly

  const [pitStopModal, setPitStopModal] = useState(false);
  const togglePitStopModal = () => setPitStopModal(prev => !prev);

  const showSuccessMsg=()=>{
            //show success message
            showMessage({
              message: 'Flag Raised',
              type: 'success',
          })
  }


  const raiseFlag = (flagType) => {
    switch (flagType) {
      case FLAG_TYPE.BLACK_FLAG:
        toggleActionModal();
        showSuccessMsg();
        return raceStore.generateLogs(FLAG_TYPE.BLACK_FLAG);

      case FLAG_TYPE.REFUEL:
        fuelStore.refuel();
        setActionModal(false);
        showSuccessMsg();
        return raceStore.generateLogs(FLAG_TYPE.REFUEL);

      case FLAG_TYPE.DRIVER_CHANGE:
        setFlagKind(null);
        setActionModal(false);
        // return raceStore.generateLogs(FLAG_TYPE.DRIVER_CHANGE);
        return toggleChangeDriverModal();

      case FLAG_TYPE.RED_FLAG:
        driverStore.stopDriverStatsInterval(false);
        fuelStore.stopFuelTimer();
        toggleActionModal();
        showSuccessMsg();
        return raceStore.generateLogs(FLAG_TYPE.RED_FLAG);
        
      case FLAG_TYPE.GREEN_FLAG:
        driverStore.restartDriverOnGreenFlag();
        fuelStore.startFuelTimer();
        showSuccessMsg();
        return raceStore.generateLogs(FLAG_TYPE.GREEN_FLAG);

      default:
        return null;
    }

  }

  const onSelect = (index) => {
    //1 --> refuel
    //2 --> driver change
    //3 --> driver change and refuel

    switch (index) { 
        case 1:
          return raiseFlag(FLAG_TYPE.REFUEL);
  
        case 2://DRIVER_CHANGE
          return raiseFlag(FLAG_TYPE.DRIVER_CHANGE);
  
        case 3://driver change and refuel
           setFlagKind(3);
           toggleChangeDriverModal();
  
        default:
          return null;
      }
  
}

const handlePitStopClick=()=>{
  toggleActionModal();
  setPitStopModal(true);
}





  return (
    <>
      {/* Start Race Button */}
      <View style={styles.lowerBtns}>
        {(!status || status == RACE_STATUS.NOT_STARTED) && schedule?.schedule?.length ? <TouchableOpacity style={styles.startButton} onPress={() => raceStore.startRace(true)}>
          <Text style={styles.buttonText}>Start Race</Text>
        </TouchableOpacity> : null}

        {status == RACE_STATUS.STARTED ? <>
          {!flags.redFlag
            ?
            <TouchableOpacity style={styles.startButton} onPress={toggleActionModal}>
              <Text style={styles.buttonText}>Take Action</Text>
            </TouchableOpacity>

            : <TouchableOpacity style={[styles.startButton, { backgroundColor: '#4A9' }]} onPress={() => raiseFlag(FLAG_TYPE.GREEN_FLAG)} >
              <Text style={styles.buttonText}>Green Flag</Text>
            </TouchableOpacity>
          }
        </> : null}
      </View>

      <CenteredModal visible={actionModal} animationType='slide' transparent={true} onClose={toggleActionModal}>
        <View style={styles.btns}>

          <TouchableOpacity style={[styles.startButton, { backgroundColor: '#000', borderWidth: 1, borderColor: '#999' }]} onPress={() => raiseFlag(FLAG_TYPE.BLACK_FLAG)} >
            <Text style={styles.buttonText}>Black Flag</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.startButton, { backgroundColor: '#FF5A5F' }]} onPress={() => raiseFlag(FLAG_TYPE.RED_FLAG)}>
            <Text style={styles.buttonText}>Red Flag</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={[styles.startButton, { backgroundColor: '#000', borderWidth: 1, borderColor: '#999' }]} onPress={() => raiseFlag(FLAG_TYPE.REFUEL)}>
            <Text style={styles.buttonText}>Refuel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.startButton, { backgroundColor: '#000', borderWidth: 1, borderColor: '#999' }]} onPress={() => raiseFlag(FLAG_TYPE.DRIVER_CHANGE)}>
            <Text style={styles.buttonText}>Change Driver</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={[styles.startButton, { backgroundColor: '#000', borderWidth: 1, borderColor: '#999' }]} onPress={handlePitStopClick}>
                <Text style={styles.buttonText}>Pit Stop</Text>
            </TouchableOpacity>

        </View>
      </CenteredModal>

      <PitStop onSelect={onSelect} visible={pitStopModal} toggleVisible={togglePitStopModal}/>
      <DriverChangePopup flagKind={flagKind} currentDriver={currentDriver} visible={changeDriverModal} toggleVisible={toggleChangeDriverModal} />

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
    gap: 10,
    paddingVertical:10
  }


})