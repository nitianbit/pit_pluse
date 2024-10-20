import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Layout, ThemeText } from '../../../components';
 import scheduleService from '../../../services/schedule';
import storageService from '../../../services/Storage';
import { STORAGE_KEYS } from '../../../services/Storage/constants';
import raceStore from '../../../store/RaceStore';
import { observer } from 'mobx-react-lite';
 

const Schedule = () => { 
  const {schedule}=raceStore;

 

  const renderRow = ({ item, index }) => {
    const rowStyle = index % 2 === 0 ? styles.rowEven : styles.rowOdd;

    return (
      <View style={[styles.row, rowStyle]}>
        <Text style={styles.cell}>{item.name}</Text>
        <Text style={styles.cell}>{(item.startDriveTime)}</Text>
        <Text style={styles.cell}>{item.endDriveTime}</Text>
        <Text style={styles.cell}>{scheduleService.minutesToTime(item.drivingDuration)}</Text>
        {/* <Text style={styles.cell}>{item.timeLeft}</Text> */}
      </View>
    );
  };

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <ThemeText style={styles.title} text="Race Schedule" />
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
            data={schedule}
            bounces={false}
            renderItem={renderRow}
            keyExtractor={(item, index) => index.toString()}

          />
        </View>

      </ScrollView>
    </Layout>
  );
};

export default observer(Schedule);

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
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 20,
    borderBottomColor: '#999',
    borderBottomWidth: 1
  }
});
