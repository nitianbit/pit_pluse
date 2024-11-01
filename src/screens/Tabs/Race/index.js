import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { DriverTimer, FuelTimer, GenerateLogs, Layout, RaceTimer, ThemeText } from '../../../components';
import raceStore from '../../../store/RaceStore';



const RaceApp = () => {
  const { data } = raceStore;


  return (
    <Layout style={styles.container}>
      <ScrollView bounces={false}>
        <>
          {/* Race and Fuel Timers */}
          <View style={styles.timerContainer}>

            <RaceTimer />
            <FuelTimer />

          </View>

          <ThemeText text='Drivers' style={styles.title} />

          {/* Race Participants */}
          {
            [...data?.drivers??[]]?.map((driver,index)=>(
              <DriverTimer key={index} driver={driver} driverId={index} />
            ))
          }
        </>

      </ScrollView>

      <GenerateLogs />

    </Layout>
  );
};

export default observer(RaceApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  timerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },


});
