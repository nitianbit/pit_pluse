import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button, TextInput, Pressable } from 'react-native';
import useThemeColor from '../../../hooks/useThemeColor';
import { Card, CenteredModal, Layout, ThemedInput, ThemeText, TopMenu } from '../../../components';
import { Slider } from '@miblanchard/react-native-slider';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { COLORS, MODAL_TYPE } from '../../../utils/constants';
import { convertMinutesToHoursAndMinutes } from '../../../utils/helper';
import CounterButton from '../../../components/CounterButton';
import { LightMode, ResetSvg } from '../../../assets/svgs';
import storageService from '../../../services/Storage';
import raceStore from '../../../store/RaceStore';
import { observer } from 'mobx-react-lite';
import NotificationService from '../../../services/notification/NotificationService';



const CardItem = ({ theme, children }) => (
  <View style={[styles.CardItem, { borderBottomColor: theme.separator }]}>
    {children}
  </View>
);

const Setup = () => {
  const theme = useThemeColor();
   const { data, stats } = raceStore;
   

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({
    type: null,
    visible: null,
    index: null
  });

  const openModal = (type, visible, index = null) => setModal({ type, visible, index });
  const closeModal = () => setModal({ type: null, visible: false, index: null });

  const handleReset=()=>{
    try {
      //TODO maybe show loader here
      closeModal();
      storageService.clearAll();
      raceStore.resetData();
    } catch (error) {
      
    }
  } 

  const create=()=>{
    NotificationService.displayNotification('RACE STARTED', 'RACE STARTED');
    NotificationService.scheduleNotification('RACE STARTED TIMER', 'RACE STARTED',moment().unix()+10);
  }

  return (
    <Layout >
      <ScrollView>
        <ThemeText style={styles.title} text="Setup" />
        <ThemeText style={styles.subTitle} text="RACE CONFIGURATION" />

        <TopMenu openModal={openModal} closeModal={closeModal} />

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
                  onSlidingComplete={(value) => raceStore.updateData('duration', value[0])}
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
                  maximumValue={Math.ceil(4 * 60 * 60)}//to seconds //data?.duration*60*60
                  step={1} //mins wise
                  minimumTrackStyle={{ backgroundColor: COLORS.BOTTOM_ACTIVE_COLOR }}
                  maximumTrackStyle={{ backgroundColor: COLORS.PRIMARY }}
                  thumbTintColor={COLORS.LIGHT}
                  containerStyle={styles.slider}
                  onValueChange={(value) => raceStore.updateData('fuelDuration', Math.ceil(value[0] / 60))}
                />
                <ThemeText style={[styles.value]} text={data?.fuelDuration ? `${convertMinutesToHoursAndMinutes(data?.fuelDuration)}` : '0h 0m'} />
              </View>
            </View>
          </CardItem>

          <CardItem theme={theme}>
            <View style={styles.labelContainer}>
              <CounterButton
                // value={`Number of Drivers: ${data?.numberOfDrivers}`}
                // onDecrement={() => updateData('numberOfDrivers', Math.max(0, data.numberOfDrivers - 1))}
                // onIncrement={() => updateData('numberOfDrivers', data.numberOfDrivers + 1)}
                value={`Number of Drivers: ${data?.drivers?.length}`}
                onDecrement={() => raceStore.updateDrivers(false)}
                onIncrement={() => raceStore.updateDrivers()}
              />
            </View>
          </CardItem>

          {data?.drivers.length ? <CardItem theme={theme}>
            <View style={styles.driverRow}>
              {data?.drivers?.map((item, index) => (
                <View style={[styles.labelContainer, styles.items]} key={index}>
                  <ThemedInput placeholder='Driver Name' style={styles.input} value={item?.name} onChangeText={(text) => raceStore.updateDriversData(index, 'name', text)} />
                  <ThemeText style={styles.label} text={convertMinutesToHoursAndMinutes(raceStore.schedule?.driverDurationList?.[index] ?? 0)} /* text={item?.time} */ />
                </View>
              ))}
            </View>
          </CardItem> : null}

          <CardItem theme={theme}>
            <View style={styles.labelContainer}>
              <CounterButton
                // value={`Number of Service Stops: ${data?.numberOfServiceStops}`}
                // onDecrement={() => updateData('numberOfServiceStops', Math.max(0, data.numberOfServiceStops - 1))}
                // onIncrement={() => updateData('numberOfServiceStops', data.numberOfServiceStops + 1)}
                value={`Number of Service Stops: ${data?.stops?.length}`}
                onDecrement={() => raceStore.updateStops(false)}
                onIncrement={() => raceStore.updateStops()}
              />
            </View>
          </CardItem>

          {data?.stops.length ? <CardItem theme={theme}>
            <View style={styles.driverRow}>
              {data?.stops?.map((item, index) => (
                <View style={[styles.labelContainer, styles.items]} key={index}>
                  {/* <ThemeText key={index} style={styles.label} text={item?.name} /> */}
                  <ThemedInput placeholder='Stop Name' style={styles.input} value={item?.name} onChangeText={(text) => raceStore.updateStopsData(index, 'name', text)} />
                  <Button title={moment(item?.start).format('HH:mm')} onPress={() => openModal(MODAL_TYPE.SERVICE_STOP_TIME, true, index)} />
                  <ThemedInput placeholder='Duration (min)' keyboardType='numeric' style={styles.input} value={item?.duration ?? ""} onChangeText={(text) => raceStore.updateStopsData(index, 'duration', text)} />
                  <ThemeText key={index} style={styles.label} text={item?.time} />
                </View>
              ))}
            </View>
          </CardItem> : null}

        </Card>

        {/* //TODO Check Dark Mode Here */}
        <ThemeText style={styles.subTitle} text="STINT ANALYSIS" />
        <Card>
          <View style={styles.stintAnalysis}>
            <View style={styles.stintItem}>
              <ThemeText color={COLORS.DARK} style={styles.stintText} text={`Qty of Stints: ${raceStore.schedule?.totalStints ? raceStore.schedule?.totalStints : 'Not available'}`} />
            </View>
            <View style={styles.stintItem}>
              <ThemeText color={COLORS.DARK} style={styles.stintText} text={`Avg Stint Duration: ${raceStore.schedule?.avgStintDuration ? parseFloat(raceStore.schedule?.avgStintDuration).toFixed(2) : 'Not available'}`} />
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
          raceStore.updateData('date', date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

      {modal.type === MODAL_TYPE.SERVICE_STOP_TIME && ![null, undefined].includes(modal.index) ? <DatePicker
        modal
        open={modal.type === MODAL_TYPE.SERVICE_STOP_TIME && modal.visible}
        mode='time'
        date={data?.stops?.[modal.index]?.start}
        onConfirm={(date) => {
          closeModal();
          raceStore.updateStopsData(modal.index, 'start', date)
        }}
        onCancel={() => {
          closeModal();
        }}
      /> : null}

      <CenteredModal visible={modal.type == MODAL_TYPE.RESET} onClose={closeModal}>
        <ThemeText style={{ fontSize: 18 }} text='Are you sure you want to reset ?' />
        <View style={styles.btns}>
          <TouchableOpacity style={[styles.closeButton, styles.outline]} onPress={closeModal}>
            <Text style={[styles.closeButtonText, { color: COLORS.PRIMARY }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={handleReset}>
            <Text style={styles.closeButtonText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </CenteredModal>


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
  },
  driverRow: {
    flex: 1
  },
  items: {
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  resetBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    zIndex: 999
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    width: '45%'
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  outline: {
    borderWidth: 1,
    borderColor: '#2196F3',
    backgroundColor: '#FFF'
  }

});

export default observer(Setup);