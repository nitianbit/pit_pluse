import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import useThemeColor from '../../hooks/useThemeColor'

const ThemedInput = ({ value, onChangeText, style = {}, ...props }) => {
  const theme = useThemeColor();

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={[{ color: theme.text, borderColor: theme.border }, style]} // Applying theme color and border color
      {...props}  // Spread other props (optional)
    />
  );
}

export default ThemedInput

const styles = StyleSheet.create({
 });
