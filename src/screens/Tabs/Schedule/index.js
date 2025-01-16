import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Layout, ThemeText } from '../../../components';
import scheduleService from '../../../services/schedule';
import raceStore from '../../../store/RaceStore';
import themeService from '../../../store/themeStore';


const Schedule = () => {
  const { schedule } = raceStore;
  const { themeConfig } = themeService;


  const renderRow = ({ item, index }) => {
    const rowStyle = { backgroundColor: index % 2 === 0 ? themeConfig.dark_blue : themeConfig.light_blue };

    return (
      <View style={[styles.row, rowStyle, item?.type == "stop" && styles.stopRow]}>
        <Text style={[styles.cell, { color: themeConfig.text }]}>{(item?.type == "stop" ? raceStore.data.stops[item.name]?.name : raceStore.data.drivers[item.name]?.name) ?? item.name}</Text>
        <Text style={[styles.cell, { color: themeConfig.text }]}>{(item.startDriveTime.substring(0, 5)) ?? ""}</Text>
        <Text style={[styles.cell, { color: themeConfig.text }]}>{item.endDriveTime?.substring(0, 5) ?? ""}</Text>
        <Text style={[styles.cell, { color: themeConfig.text }]}>{scheduleService.minutesToTime(item.drivingDuration)?.substring(0, 5) ?? ""}</Text>
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
            <Text style={[styles.headerText,{ color: themeConfig.text }]}>Driver</Text>
            <Text style={[styles.headerText,{ color: themeConfig.text }]}>Start Time</Text>
            <Text style={[styles.headerText,{ color: themeConfig.text }]}>End Time</Text>
            <Text style={[styles.headerText,{ color: themeConfig.text }]}>Duration</Text>
            {/* <Text style={styles.headerText}>Time Left</Text> */}
          </View>

          {/* Table Rows with Vertical Scroll */}
          {schedule?.schedule?.length ? <FlatList
            // data={raceData}
            data={schedule?.schedule ?? []}
            bounces={false}
            renderItem={renderRow}
            keyExtractor={(item, index) => index.toString()}

          /> : (
            <Text style={styles.noLogsText}>No Schedule available</Text>
          )}
        </View>

      </View>
    </Layout>
  );
};

export default observer(Schedule);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    // backgroundColor: '#fff',
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
    marginHorizontal: 5
  },

  tableContainer: {
    maxHeight: 400, // Set a fixed height to allow vertical scrolling
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#DCDCDC'
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
  stopRow: {
    backgroundColor: '#4A90E2'
  },
  noLogsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});
