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

     <ThemeText text='Drivers' style={styles.title} />

      {/* Race Participants */}
      <FlatList
        // data={data?.drivers}
        data={[...data?.drivers]}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item, index }) => <DriverTimer key={index} driver={item} driverId={index} />}
        bounces={false}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center'
  },


});
