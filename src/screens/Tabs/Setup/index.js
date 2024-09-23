// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { Layout } from '../../../components'
// import getTheme from '../../../theme'

// const Setup = () => {
//     const theme = getTheme();

//     const styles = StyleSheet.create({
//         header:{
//             color:theme.text,
//             fontSize: 20,
//         }
//     })

//   return (
//     <Layout>
//       <Text style={styles.header}>Setup</Text>
//     </Layout>
//   )

  
// }

// export default Setup

 


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, useColorScheme, Appearance } from 'react-native';
import useThemeColor from '../../../hooks/useThemeColor';
import { Card, Layout } from '../../../components';

 

const SettingsItem = ({ icon, color, label, value, showChevron = true, theme }) => (
  <TouchableOpacity style={[styles.settingsItem, { borderBottomColor: theme.separator }]}>
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
     </View>
    <View style={styles.labelContainer}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      {value && <Text style={[styles.value, { color: theme.subText }]}>{value}</Text>}
    </View>
    
  </TouchableOpacity>
);
 
const Setup = () => {
  const theme=useThemeColor();

  return (
    <Layout >
      <ScrollView>
        <Card >
          <SettingsItem
            icon="airplane"
            color="#FF9500"
            label="Airplane Mode"
            showChevron={false}
            theme={theme}
          />
          <SettingsItem
            icon="wifi"
            color="#007AFF"
            label="Wi-Fi"
            value="MyNetwork"
            theme={theme}
          />
          <SettingsItem
            icon="bluetooth"
            color="#007AFF"
            label="Bluetooth"
            value="On"
            theme={theme}
          />
          <SettingsItem
            icon="cellular"
            color="#4CD964"
            label="Cellular"
            theme={theme}
          />
          <SettingsItem
            icon="hotspot"
            color="#4CD964"
            label="Personal Hotspot"
            value="Off"
            theme={theme}
          />
        </Card>

        <Card  >
          <SettingsItem
            icon="notifications"
            color="#FF3B30"
            label="Notifications"
            theme={theme}
          />
          <SettingsItem
            icon="volume-high"
            color="#FF2D55"
            label="Sounds & Haptics"
            theme={theme}
          />
          <SettingsItem
            icon="moon"
            color="#5856D6"
            label="Focus"
            theme={theme}
          />
          <SettingsItem
            icon="hourglass"
            color="#5856D6"
            label="Screen Time"
            theme={theme}
          />
        </Card>

        
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
});

export default Setup;