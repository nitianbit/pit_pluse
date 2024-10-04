import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import useThemeColor from '../../../hooks/useThemeColor';
import { Card, Layout, ThemeText } from '../../../components';
import { Slider } from '@miblanchard/react-native-slider';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { COLORS } from '../../../utils/constants';
import { convertMinutesToHoursAndMinutes } from '../../../utils/helper';
import CounterButton from '../../../components/CounterButton';



const CardItem = ({ theme, children }) => (
  <View style={[styles.CardItem, { borderBottomColor: theme.separator }]}>
    {children}
  </View>
);

const Setup = () => {
  const theme = useThemeColor();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    date: new Date(),
    startTime: moment().unix(),
    duration: 0,
    fuelDuration: 0,
    numberOfDrivers: 0,
    numberOfServiceStops: 0,
  })

  //TODO add debounce here
  const updateData = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }))
  }



  return (
    <Layout >
      <ScrollView>
        <ThemeText style={styles.title} text="Setup" />
        <ThemeText style={styles.subTitle} text="RACE CONFIGURATION" />
        <Card >

          <CardItem theme={theme}>
            <View style={styles.labelContainer}>
              <ThemeText style={[styles.label, { flex: 1 }]} text='Race Start Time' />
              <View style={styles.timerStart}>
                <Button title={moment(data?.date).format('HH:mm')} onPress={() => setOpen(true)} />
              </View>
            </View>
          </CardItem>

          <CardItem theme={theme}>
            <View style={styles.labelContainer}>
              <ThemeText style={[styles.label]} text='Race Duration' />
              <View style={styles.sliderView}>
                <Slider
                  value={data?.duration}
                  maximumValue={24}
                  step={1} //hour wise
                  onSlidingComplete={(value) => updateData('duration', value[0])}
                  minimumTrackStyle={{ backgroundColor: COLORS.BOTTOM_ACTIVE_COLOR }}
                  maximumTrackStyle={{ backgroundColor: COLORS.PRIMARY }}
                  thumbTintColor={COLORS.LIGHT}
                  containerStyle={styles.slider}
                />
                <ThemeText style={[styles.value]} text={`${data?.duration}h`} />
              </View>
            </View>
          </CardItem>

          <CardItem theme={theme}>
            <View style={styles.labelContainer}>
              <ThemeText style={[styles.label]} text='Fuel Duration' />
              <View style={styles.sliderView}>
                <Slider
                  maximumValue={Math.ceil(24 * 60)}//to seconds //data?.duration*60*60
                  step={1} //mins wise
                  minimumTrackStyle={{ backgroundColor: COLORS.BOTTOM_ACTIVE_COLOR }}
                  maximumTrackStyle={{ backgroundColor: COLORS.PRIMARY }}
                  thumbTintColor={COLORS.LIGHT}
                  containerStyle={styles.slider}
                  onSlidingComplete={(value) => updateData('fuelDuration', value[0])}
                />
                <ThemeText style={[styles.value]} text={data?.fuelDuration ? `${convertMinutesToHoursAndMinutes(data?.fuelDuration)}` : '0h 0m'} />
              </View>
            </View>
          </CardItem>

          <CardItem theme={theme}>
            <View style={styles.labelContainer}>
              <CounterButton
                value={`Number of Drivers: ${data?.numberOfDrivers}`}
                onDecrement={() => updateData('numberOfDrivers', Math.max(0, data.numberOfDrivers - 1))}
                onIncrement={() => updateData('numberOfDrivers', data.numberOfDrivers + 1)}
              />
            </View>
          </CardItem>

          <CardItem theme={theme}>
            <View style={styles.labelContainer}>
              <CounterButton
                value={`Number of Service Stops: ${data?.numberOfServiceStops}`}
                onDecrement={() => updateData('numberOfServiceStops', Math.max(0, data.numberOfServiceStops - 1))}
                onIncrement={() => updateData('numberOfServiceStops', data.numberOfServiceStops + 1)}
              />
            </View>
          </CardItem>

        </Card>

        {/* //TODO Check Dark Mode Here */}
        <ThemeText style={styles.subTitle} text="STINT ANALYSIS" />
        <Card>
          <View style={styles.stintAnalysis}>
            <View style={styles.stintItem}>
              <ThemeText color={COLORS.DARK} style={styles.stintText} text={`Qty of Stints: Not available`} />
            </View>
            <View style={styles.stintItem}>
              <ThemeText color={COLORS.DARK} style={styles.stintText} text={`Avg Stint Duration: Not available`} />
            </View>
          </View>
        </Card>


      </ScrollView>

      <DatePicker
        modal
        open={open}
        mode='time'
        date={data?.date}
        onConfirm={(date) => {
          setOpen(false)
          updateData('date', date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  CardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 18,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  label: {
    fontSize: 18,
  },
  value: {
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'center'
  },
  sliderView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  timerStart: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 8
  },
  slider: {
    flex: 1
  },
  stintAnalysis: {
    backgroundColor: COLORS.DARK,
    marginVertical: 15,
    marginHorizontal: 25,
    padding: 20,
    borderRadius: 10,
  },
  stintItem: {
    backgroundColor: COLORS.LIGHT,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  stintText: {
    fontSize: 18,
    fontWeight: '500',
  }
});

export default Setup;