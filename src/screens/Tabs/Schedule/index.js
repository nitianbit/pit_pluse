import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Layout, ThemeText } from '../../../components';
import scheduleService from '../../../services/schedule';
import raceStore from '../../../store/RaceStore';
 

const Schedule = () => { 
  const {schedule}=raceStore;

 

  const renderRow = ({ item, index }) => {
    const rowStyle = index % 2 === 0 ? styles.rowEven : styles.rowOdd;

    return (
      <View style={[styles.row, rowStyle,item?.type=="stop" && styles.stopRow]}>
        <Text style={styles.cell}>{item.name}{item?.type??""}</Text>
        <Text style={styles.cell}>{(item.startDriveTime.substring(0,5))??""}</Text>
        <Text style={styles.cell}>{item.endDriveTime?.substring(0,5)??""}</Text>
        <Text style={styles.cell}>{scheduleService.minutesToTime(item.drivingDuration)?.substring(0,5)??""}</Text>
        {/* <Text style={styles.cell}>{item.timeLeft}</Text> */}
      </View>
    );
  };

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <ThemeText style={styles.title} text="Race Schedule" />
      <View style={styles.container} bounces={false}>
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
            data={schedule?.schedule??[]}
            bounces={false}
            renderItem={renderRow}
            keyExtractor={(item, index) => index.toString()}

          />
        </View>

      </View>
    </Layout>
  );
};

export default observer(Schedule);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000', 
    marginHorizontal:5
  },
 
  tableContainer: {
    maxHeight: 400, // Set a fixed height to allow vertical scrolling
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth:1,
    borderColor:'#DCDCDC'
  },
  rowOdd: {
     backgroundColor: '#464646'
  },
  rowEven: {
    backgroundColor: '#656565',  // Example for even rows
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
   },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 20,
    borderBottomColor: '#999',
    borderBottomWidth: 1
  },
  stopRow:{
    backgroundColor:'#4A90E2'
  }
});
