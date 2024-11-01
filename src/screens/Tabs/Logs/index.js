import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DIMENSIONS } from '../../../utils/constants'
import { ThemeText } from '../../../components'
 import scheduleService from '../../../services/schedule'
import moment from 'moment'
import raceStore from '../../../store/RaceStore'
import { observer } from 'mobx-react-lite'
import { useTheme } from '@react-navigation/native'

function formatTimeLeft(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  let result="";
  if(hours>0){
    result+=`${hours}h `;
  }
  if(minutes>0){
    result+=`${minutes}m `;
  }
  if(seconds>0 && hours<=0){
    result+=`${seconds}s`;
  }
  return result;

  // return `${hours}h ${minutes}m ${seconds}s`;
}
const rowStyle =(index) => index % 2 === 0 ? styles.rowEven : styles.rowOdd;

const Logs = () => {
 const {logs}= raceStore;
 const t=useTheme();

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Table Header */}
      <ThemeText style={styles.title} text="Race Logs" />
      <View style={[styles.tableHeader,{backgroundColor:t.colors.card}]}>
        <Text style={[styles.headerText,{color:t.colors.text}]}>Driver</Text>
        <Text style={[styles.headerText,{color:t.colors.text}]}>Race Time Left</Text>
        <Text style={[styles.headerText,{color:t.colors.text}]}>Fuel Time Left</Text>
        <Text style={[styles.headerText,{color:t.colors.text,flex:2}]}>Event</Text>
        <Text style={[styles.headerText,{color:t.colors.text}]}>Time</Text>
      </View>

{/* <View style={[styles.tableHeader,{backgroundColor:t.colors.card}]}>
        <ThemeText value="Driver" style={styles.headerText}/>
        <ThemeText value="Race Time Left" style={styles.headerText}/>
        <ThemeText value="Fuel Time Left" style={styles.headerText}/>
        <ThemeText value="Event" style={styles.headerText}/>
        <ThemeText value="Time" style={styles.headerText}/>
      </View> */}

      {/* Scrollable Table Rows */}
      <ScrollView style={styles.scrollContainer} bounces={false}>
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <View key={index} style={[styles.tableRow,rowStyle(index)]}>
              <ThemeText style={styles.cellText} text={log.currentDriver} /> 
              <ThemeText style={styles.cellText} text={formatTimeLeft(log.timeLeftForRace??0)} /> 
              <ThemeText style={styles.cellText} text={formatTimeLeft(log.timeLeftForFuel??0)} /> 
              <ThemeText style={styles.eventText} text={log.event || 'N/A'} /> 
              <ThemeText style={styles.cellText} text={moment.unix(log.currentTime).format('hh:mm A')}/> 
            </View>
          ))
        ) : (
          <Text style={styles.noLogsText}>No logs available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Logs);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 20,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
    paddingVertical: 10,
    // backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  cellText: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    paddingVertical:10,
    fontWeight:'500'
  },
  eventText: {
    fontSize: 14,
    flex: 2,
    textAlign: 'center',
    paddingVertical:10,
    fontWeight:'500',
  },
  noLogsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  rowOdd: {
    backgroundColor: '#464646'
 },
 rowEven: {
   backgroundColor: '#656565',  
 },
});
