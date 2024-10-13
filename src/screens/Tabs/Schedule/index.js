import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Layout } from '../../../components';
import { useAppContext } from '../../../services/AppContext';
import scheduleService from '../../../services/schedule';
import storageService from '../../../services/Storage';
import { STORAGE_KEYS } from '../../../services/Storage/constants';

const raceData = [
  { id: '1', name: 'Rodrigo', startTime: '13:00', endTime: '14:20', duration: '01:20', timeLeft: '22:40' },//here all time related fields will be in seconds and then will convert it into hh:mm
  { id: '2', name: 'Shubham', startTime: '14:20', endTime: '15:40', duration: '01:20', timeLeft: '21:20' },
  { id: '3', name: 'Tony', startTime: '15:40', endTime: '17:00', duration: '01:20', timeLeft: '20:00' },
  { id: '4', name: 'Valentin', startTime: '17:00', endTime: '18:20', duration: '01:20', timeLeft: '18:40' },
  { id: '5', name: 'Ben', startTime: '18:20', endTime: '19:40', duration: '01:20', timeLeft: '17:20' },
];

const Schedule = () => {
  const { data,setTripStats,setData } = useAppContext();
  const [scheduleData, setScheDuleData] = useState([]);

  //update trip here if not already present
  const scheduleTrip = async () => {
    try {
      const trip = await storageService.get(STORAGE_KEYS.ACTIVE_RACE);
      if (!trip && data) {
        const res = scheduleService.getStats(data);
        if (res) {
          setScheDuleData(res.schedule);
          console.log(res.schedule);
          await storageService.saveKey(STORAGE_KEYS.ACTIVE_RACE, data);
        }
      } else {
        const res = scheduleService.getStats(trip);
        if (res) {
          setScheDuleData(res.schedule);
          setTripStats(res);
          setData(trip);
        } 
      }
    } catch (error) {

    }
  }


  useEffect(() => {
    scheduleTrip();
    // setScheDuleData(scheduleService.getStats(data));
  }, [data])

  const renderRow = ({ item, index }) => {
    const rowStyle = index % 2 === 0 ? styles.rowEven : styles.rowOdd;

    return (
      <View style={[styles.row, rowStyle]}>
        <Text style={styles.cell}>{item.name}</Text>
        <Text style={styles.cell}>{(item.startDriveTime).slice(0, 5)}</Text>
        <Text style={styles.cell}>{item.endDriveTime.slice(0, 5)}</Text>
        <Text style={styles.cell}>{scheduleService.minutesToTime(item.drivingDuration).slice(0, 4)}</Text>
        {/* <Text style={styles.cell}>{item.timeLeft}</Text> */}
      </View>
    );
  };

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <ScrollView horizontal style={styles.container} bounces={false}>
        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Driver</Text>
            <Text style={styles.headerText}>Start Time</Text>
            <Text style={styles.headerText}>End Time</Text>
            <Text style={styles.headerText}>Duration</Text>
            {/* <Text style={styles.headerText}>Time Left</Text> */}
          </View>

          {/* Table Rows with Vertical Scroll */}
          <FlatList
            // data={raceData}
            data={scheduleData}
            bounces={false}
            renderItem={renderRow}
            keyExtractor={(item, index) => index.toString()}

          />
        </View>

      </ScrollView>
    </Layout>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    minWidth: 100, // Adjust column width for horizontal scrolling
  },
  tableContainer: {
    maxHeight: 400, // Set a fixed height to allow vertical scrolling
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  rowOdd: {
    backgroundColor: '#8B0000', // Red color for odd rows
  },
  rowEven: {
    backgroundColor: '#333', // Dark background for even rows
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    minWidth: 100, // Adjust column width for horizontal scrolling
  },
});
