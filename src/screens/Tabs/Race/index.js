import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Layout, ThemeText } from '../../../components';
import { FlagDotted, FuelIcon } from '../../../assets/svgs';

const raceData = [
  { id: '1', name: 'Rodrigo', time: '00:00:00' },
  { id: '2', name: 'Shubham', time: '00:00:00' },
  { id: '3', name: 'Tony', time: '00:00:00' },
  { id: '4', name: 'Valentin', time: '00:00:00' },
  { id: '5', name: 'Ben', time: '00:00:00' },
];

const RaceApp = () => {
  const [raceTime, setRaceTime] = useState('24:00:00');
  const [fuelTime, setFuelTime] = useState('01:31:00');
  const [raceProgress, setRaceProgress] = useState(100);
  const [fuelProgress, setFuelProgress] = useState(60);

  const startRace = () => {
    setRaceStarted(true);
  };

  return (
    <Layout style={styles.container}>
      {/* Race and Fuel Timers */}
      <View style={styles.timerContainer}>
        {/* Race Timer with percentage fill */}

        <View style={styles.timerBox}>
          <View style={[styles.fill, { width: `${raceProgress}%`, backgroundColor: '#4A90E2' }]} />
          <View style={styles.contentContainer}>
            <FlagDotted/>
            <Text style={styles.timerText}>{raceTime}</Text>
          </View>
        </View>


        {/* Fuel Timer */}
        <View style={styles.timerBox}>
        <View style={[styles.fill, { width: `${fuelProgress}%`, backgroundColor: '#FF5A5F' }]} />
        <View style={styles.contentContainer}>
          <FuelIcon/>
          <Text style={styles.timerText}>{fuelTime}</Text>
          </View>
        </View>
      </View>

      {/* Start Race Button */}
      <TouchableOpacity style={styles.startButton} onPress={startRace}>
        <Text style={styles.buttonText}>Start Race</Text>
      </TouchableOpacity>

      {/* Race Participants */}
      <FlatList
        data={raceData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.participantRow}>
            <Text style={styles.participantName}>{item.name}</Text>
            <Text style={styles.participantTime}>{item.time}</Text>
          </View>
        )}
      />

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
    borderRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden', // Ensure the fill doesn't overflow outside the box
    backgroundColor: '#333', // Background for the timer box,
    marginBottom:20
    
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
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
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
    padding: 15,
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
});
