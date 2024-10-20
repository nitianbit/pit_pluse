import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DIMENSIONS } from '../../../utils/constants'
import { ThemeText } from '../../../components'
 import scheduleService from '../../../services/schedule'
import moment from 'moment'
import raceStore from '../../../store/RaceStore'
import { observer } from 'mobx-react-lite'

const Logs = () => {
 const {logs}= raceStore;

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Table Header */}
      <ThemeText style={styles.title} text="Race Logs" />
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Driver</Text>
        <Text style={styles.headerText}>Race Time Left</Text>
        <Text style={styles.headerText}>Fuel Time Left</Text>
        <Text style={styles.headerText}>Event</Text>
        <Text style={styles.headerText}>Time</Text>
      </View>

      {/* Scrollable Table Rows */}
      <ScrollView style={styles.scrollContainer}>
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <View key={index} style={styles.tableRow}>
              <ThemeText style={styles.cellText} text={log.currentDriver} /> 
              <ThemeText style={styles.cellText} text={scheduleService.minutesToTime(log.timeLeftForRace??0)} /> 
              <ThemeText style={styles.cellText} text={scheduleService.minutesToTime(log.timeLeftForFuel??0)} /> 
              <ThemeText style={styles.cellText} text={log.event || 'N/A'} /> 
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cellText: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  noLogsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});
