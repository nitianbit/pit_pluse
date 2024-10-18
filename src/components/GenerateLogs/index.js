import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DIMENSIONS, FLAG_TYPE, RACE_STATUS } from '../../utils/constants'
import scheduleService from '../../services/schedule'
import { getDriverNameUsingIndex, getEvent } from '../../utils/helper'
import moment from 'moment'
import { useAppContext } from '../../services/AppContext'



const GenerateLogs = () => {
  const {data,setData} = useAppContext();


  const raiseFlag=(flagType)=>{
     if(data.status!==RACE_STATUS.STARTED){
       return Alert.alert("Race not started yet.");    
     }
    setData(prev => ({
      ...prev, flags: {
        [flagType]: true
      }
    }));

     switch (flagType) {
      case 'value':
        
        break;
     
      default:
        break;
     }

  }

  const generateLogs=()=>{
    if(data.status!==RACE_STATUS.STARTED){
      return Alert.alert("Race not started yet.");    
    }
    const currentDriver=scheduleService.getCurrentDriverAndTimeLeft()
    const scheduleData=scheduleService.data;
    const remainingData=scheduleService.getRemainingRaceAndFuelTime();

    setData(prev => ({ ...prev,logs:[
      ...(prev.logs || []),
      {
         currentDriver:getDriverNameUsingIndex(currentDriver.currentDriver,data.drivers),
         timeLeftForRace: remainingData.remainingRaceTime,
         timeLeftForFuel: remainingData.remainingFuelTime,
         event:getEvent(data?.flags) || 'N/A',
         currentTime:moment().unix()
      }
    ]}));
    
  }

  return (
    <View style={styles.btns}>
    <TouchableOpacity style={styles.startButton} onPress={generateLogs}>
      <Text style={styles.buttonText}>Take Logs</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.startButton, { backgroundColor: '#FF5A5F' }]} onPress={()=>raiseFlag(FLAG_TYPE.RED_FLAG)}>
      <Text style={styles.buttonText}>Red Flag</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.startButton, { backgroundColor: '#000', borderWidth: 1, borderColor: '#999' }]} onPress={()=>raiseFlag(FLAG_TYPE.BLACK_FLAG)} >
      <Text style={styles.buttonText}>Black Flag</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.startButton, { backgroundColor: '#4A9' }]} onPress={()=>raiseFlag(FLAG_TYPE.GREEN_FLAG)} >
      <Text style={styles.buttonText}>Green Flag</Text>
    </TouchableOpacity>
  </View>
  )
}

export default GenerateLogs

const styles = StyleSheet.create({
    startButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 20,
        width: (DIMENSIONS.WIDTH / 2) - 20
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