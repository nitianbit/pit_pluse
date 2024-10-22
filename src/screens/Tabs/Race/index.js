import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { DriverTimer, FuelTimer, GenerateLogs, Layout, RaceTimer, ThemeText } from '../../../components';
import { FlagDotted, FuelIcon } from '../../../assets/svgs';
import useTimer from '../../../hooks/useTimer';
import { formatTime } from '../../../utils/helper';
import { COLORS, RACE_STATUS } from '../../../utils/constants';
import scheduleService from '../../../services/schedule';
import ProgressBar from '../../../components/ProgressBar';
import raceStore from '../../../store/RaceStore';
import { observer } from 'mobx-react-lite';
import stintStore from '../../../store/StintStore';



const RaceApp = () => {
  const { data } = raceStore;

 
  return (
    <Layout style={styles.container}>
      {/* Race and Fuel Timers */}
      <View style={styles.timerContainer}>

       <RaceTimer />
       <FuelTimer />

      </View>



      {/* Race Participants */}
      <FlatList
        // data={data?.drivers}
        data={[...data?.drivers]}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item, index }) => <DriverTimer key={index} driver={item} driverId={index} />}
      />

      <GenerateLogs />

    </Layout>
  );
};

export default observer(RaceApp);

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


});
