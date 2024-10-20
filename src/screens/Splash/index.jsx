import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Layout from '../../components/Layout'
import { DIMENSIONS } from '../../utils/constants'
import { useNavigation, useTheme } from '@react-navigation/native';
import { ThemeText } from '../../components';
import { NavName } from '../../navigation/constants';
const Splash = () => {
    const { colors } = useTheme();
    const navigation=useNavigation();
    
    useEffect(()=>{
      setTimeout(()=>{
        navigation.navigate(NavName.HOME)
      }, 1000)
    },[])

    return (
        <Layout style={styles.layout}>
            <ThemeText text='Pit Pulse' style={styles.title} />

        </Layout>
    )
}

export default Splash

const styles = StyleSheet.create({
    image: {
        height: DIMENSIONS.HEIGHT,
        width: DIMENSIONS.WIDTH
    },
    layout:{
      flex: 1, 
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
    },
    title:{
      fontSize: 30,
      fontWeight: '500',
     }
})



// import React, { useState } from 'react';
// import { View, Text, TextInput, Button,  StyleSheet } from 'react-native';

// const RaceConfiguration = () => {
//   const [raceStartTime, setRaceStartTime] = useState('13:00');
//   const [raceDuration, setRaceDuration] = useState(24);
//   const [fuelDuration, setFuelDuration] = useState(1.5);
//   const [numberOfDrivers, setNumberOfDrivers] = useState(5);
//   const [numberOfServiceStops, setNumberOfServiceStops] = useState(2);
//   const [serviceStops, setServiceStops] = useState(['20:59', '08:36']);
//   const drivers = [
//     { name: 'Rodrigo', time: '5h 34m' },
//     { name: 'Shubham', time: '5h 43m' },
//     { name: 'Tony', time: '4h 14m' },
//     { name: 'Valentin', time: '4h 14m' },
//     { name: 'Ben', time: '4h 15m' },
//   ];

//   const increaseDrivers = () => setNumberOfDrivers(prev => Math.min(prev + 1, 10));
//   const decreaseDrivers = () => setNumberOfDrivers(prev => Math.max(prev - 1, 1));

//   const increaseStops = () => {
//     if (numberOfServiceStops < 10) {
//       setNumberOfServiceStops(prev => prev + 1);
//       setServiceStops([...serviceStops, '']);
//     }
//   };

//   const decreaseStops = () => {
//     if (numberOfServiceStops > 1) {
//       setNumberOfServiceStops(prev => prev - 1);
//       setServiceStops(serviceStops.slice(0, -1));
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Setup</Text>
//       <Text style={styles.subtitle}>Race Configuration</Text>

//       <View style={styles.row}>
//         <Text>Race Start Time</Text>
//         <TextInput
//           style={styles.input}
//           value={raceStartTime}
//           onChangeText={setRaceStartTime}
//           keyboardType="numeric"
//         />
//       </View>

//       <View style={styles.row}>
//         <Text>Race Duration</Text>
         
//         <Text>{raceDuration}h</Text>
//       </View>

//       <View style={styles.row}>
//         <Text>Fuel Duration</Text>
        
//         <Text>{Math.floor(fuelDuration)}h {Math.floor((fuelDuration % 1) * 60)}m</Text>
//       </View>

//       <View style={styles.row}>
//         <Text>Number of Drivers: {numberOfDrivers}</Text>
//         <Button title="-" onPress={decreaseDrivers} />
//         <Button title="+" onPress={increaseDrivers} />
//       </View>

//       {drivers.slice(0, numberOfDrivers).map(driver => (
//         <View key={driver.name} style={styles.row}>
//           <Text>{driver.name}</Text>
//           <Text>{driver.time}</Text>
//         </View>
//       ))}

//       <View style={styles.row}>
//         <Text>Number of Service Stops: {numberOfServiceStops}</Text>
//         <Button title="-" onPress={decreaseStops} />
//         <Button title="+" onPress={increaseStops} />
//       </View>

//       {serviceStops.slice(0, numberOfServiceStops).map((stop, index) => (
//         <View key={index} style={styles.row}>
//           <Text>Service Stop {index + 1}</Text>
//           <TextInput
//             style={styles.input}
//             value={stop}
//             onChangeText={text => {
//               const newStops = [...serviceStops];
//               newStops[index] = text;
//               setServiceStops(newStops);
//             }}
//             keyboardType="numeric"
//           />
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#000',
//     flex: 1,
//   },
//   title: {
//     fontSize: 24,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#ccc',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   input: {
//     backgroundColor: '#333',
//     color: '#fff',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//     width: 80,
//     textAlign: 'center',
//   },
//   slider: {
//     flex: 1,
//     marginHorizontal: 10,
//   },
// });

// export default RaceConfiguration;
