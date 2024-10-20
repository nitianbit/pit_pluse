import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { GenerateLogs, Layout, ThemeText } from '../../../components';
import { FlagDotted, FuelIcon } from '../../../assets/svgs';
import { useAppContext } from '../../../services/AppContext';
import useTimer from '../../../hooks/useTimer';
import { formatTime } from '../../../utils/helper';
import { COLORS, RACE_STATUS } from '../../../utils/constants';
import scheduleService from '../../../services/schedule';
import ProgressBar from '../../../components/ProgressBar';



const RaceApp = () => {
  const { data, setData } = useAppContext();
  const { seconds, startTimer, pauseTimer, resetTimer, timeLeft } = {} = useTimer(data.duration * 60 * 60, data.durationCovered);
  const [raceTime, setRaceTime] = useState('24:00:00');
  const [fuelTime, setFuelTime] = useState('01:31:00');
  const [raceProgress, setRaceProgress] = useState(100);
  const [fuelProgress, setFuelProgress] = useState(60);

  const startRace = () => {
    setData(prev => ({ ...prev, status: RACE_STATUS.STARTED }));
    //TODO add log here
  };




  return (
    <Layout style={styles.container}>
      {/* Race and Fuel Timers */}
      <View style={styles.timerContainer}>

        {/* Progress Bar */}
        <ProgressBar time={timeLeft} fillColor='#4A90E2' fillPercent='60' style={{marginBottom:20}} >
          <FlagDotted />
        </ProgressBar>

        {/* Progress Bar */}
        <ProgressBar time={timeLeft} fillColor='#FF5A5F' fillPercent='40' style={{marginBottom:20}} >
          <FlagDotted />
        </ProgressBar>

      </View>



      {/* Race Participants */}
      <FlatList
        // data={data?.drivers}
        data={[...data?.drivers, { id: 'driver-1', name: 'Driver 1', time: 0 }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {

          return (
            <View key={index} style={[styles.participantRow, styles.selectedDriver]}>
              <ProgressBar time={timeLeft} fillColor='#999' fillPercent='40' >
                <Text style={styles.participantName}>{item.name}</Text>
              </ProgressBar>
            </View>
          )

        }}
      />

      {/* Start Race Button */}
      {data?.status === RACE_STATUS.NOT_STARTED ? <TouchableOpacity style={styles.startButton} onPress={startRace}>
        <Text style={styles.buttonText}>Start Race</Text>
      </TouchableOpacity> : null}
      
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
    paddingHorizontal: 0,
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
    paddingHorizontal: 15
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
    borderRadius:10,
    overflow: 'hidden',
  },
  participantName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    width:'65%'
  },
  selectedDriver: {
    borderWidth: 2,
    borderColor: '#4A90E2'
  },
});
