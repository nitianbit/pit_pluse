import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { GenerateLogs, Layout, ThemeText } from '../../../components';
import { FlagDotted, FuelIcon } from '../../../assets/svgs';
import { useAppContext } from '../../../services/AppContext';
import useTimer from '../../../hooks/useTimer';
import { formatTime } from '../../../utils/helper';
import { COLORS, RACE_STATUS } from '../../../utils/constants';
import scheduleService from '../../../services/schedule';

const raceData = [
  { id: '1', name: 'Rodrigo', time: '00:00:00' },
  { id: '2', name: 'Shubham', time: '00:00:00' },
  { id: '3', name: 'Tony', time: '00:00:00' },
  { id: '4', name: 'Valentin', time: '00:00:00' },
  { id: '5', name: 'Ben', time: '00:00:00' },
];

const RaceApp = () => {
  const { data, setData } = useAppContext();
  const { seconds, startTimer, pauseTimer, resetTimer, timeLeft } = {} = useTimer(data.duration * 60 * 60, data.durationCovered);
  const [raceTime, setRaceTime] = useState('24:00:00');
  const [fuelTime, setFuelTime] = useState('01:31:00');
  const [raceProgress, setRaceProgress] = useState(100);
  const [fuelProgress, setFuelProgress] = useState(60);
  const stats=scheduleService.getCurrentDriverAndTimeLeft();

  useEffect(() => {
    if (data.status === RACE_STATUS.STARTED) {
      resetTimer(data.duration * 60 * 60, data.durationCovered)
    }
    setRaceProgress(data.durationCovered / data.duration * 100);
  }, [data.duration, data.durationCovered, data.status])

  const percentageCompleted=()=>{
    const tripDuration=data.duration*60*60; 
    // const durationCovered=tripDuration-timeLeft;
    return (timeLeft / tripDuration * 100);
  }

  const startRace = () => {
    setData(prev => ({ ...prev, status: RACE_STATUS.STARTED }));
    //TODO add log here
  };

    // Function to calculate each driver's progress
    const getDriverProgress = (index) => {
      const driverStats=scheduleService.getDriversAndTimeLeft();
      if (!driverStats) return 0;
      const driverData = driverStats?.drivers?.[index];
      if(!driverData) return 0;
      // return ((driverData.totalDrivingDuration - driverData.remainingTime) / driverData.totalDrivingDuration) * 100;
      return {
        progress:(( driverData.remainingTime) / driverData.totalDrivingDuration) * 100,
        totalDuration: driverData.totalDrivingDuration
      };
    };
  


  return (
    <Layout style={styles.container}>
      {/* Race and Fuel Timers */}
      <View style={styles.timerContainer}>
        {/* Race Timer with percentage fill */}

        <View style={styles.timerBox}>
          {/* <View style={[styles.fill, { width: `${raceProgress}%`, backgroundColor: '#4A90E2' }]} /> */}
          <View style={[styles.fill, { width: `${percentageCompleted()}%`, backgroundColor: '#4A90E2' }]} />
          <View style={styles.contentContainer}>
            <FlagDotted />
            {/* <Text style={styles.timerText}>{raceTime}</Text> */}
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>


        {/* Fuel Timer */}
        <View style={styles.timerBox}>
          <View style={[styles.fill, { width: `${fuelProgress}%`, backgroundColor: '#FF5A5F' }]} />
          <View style={styles.contentContainer}>
            <FuelIcon />
            <Text style={styles.timerText}>{fuelTime}</Text>
          </View>
        </View>
      </View>

      {/* Start Race Button */}
      {data?.status === RACE_STATUS.NOT_STARTED ? <TouchableOpacity style={styles.startButton} onPress={startRace}>
        <Text style={styles.buttonText}>Start Race</Text>
      </TouchableOpacity> : null}

      {/* Race Participants */}
      <FlatList
        data={data?.drivers}
        keyExtractor={(item) => item.id}
        renderItem={({ item,index }) => {
          const {progress,totalDuration}=getDriverProgress(index);

         return (<View key={index} style={[styles.participantRow, index===stats.currentDriver && styles.selectedDriver]}>
            <View style={styles.driverRow}>
            <Text style={styles.participantName}>{item.name}</Text>
            <Text style={styles.participantTime}>{formatTime((totalDuration??0)*60)}</Text>
            </View>
            <View style={[styles.fill, { width: `${progress}%`, backgroundColor: '#4A90E2' }]} />
          </View>)
        }}
      />

      <GenerateLogs />

    </Layout>
  );
};

export default RaceApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  timerContainer: {
    marginBottom: 20,
  },
  timerBox: {
    padding: 15,
    paddingHorizontal:0,
    borderRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden', // Ensure the fill doesn't overflow outside the box
    backgroundColor: '#333', // Background for the timer box,
    marginBottom: 20

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
    paddingHorizontal:15
  },
  timerText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
  },
  participantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    borderRadius: 8,
    marginVertical: 5,
  },
  participantName: {
    color: '#FFF',
    fontSize: 16,
  },
  participantTime: {
    color: '#FFF',
    fontSize: 16,
  },
  raceLog: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    marginTop: 20,
  },
  selectedDriver:{
    borderWidth:1,
    borderColor:'red'
  },
  driverRow:{
    zIndex:999,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%',
    padding:15,
    borderRadius: 8,
    marginVertical: 5,
  }
});
