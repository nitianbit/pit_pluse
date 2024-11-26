import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import useThemeColor from '../../hooks/useThemeColor'
import { useTheme } from '@react-navigation/native';

const ThemedInput = ({ value, onChangeText, style = {}, ...props }) => {
  const theme = useThemeColor();
  const t =useTheme();

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={t.colors.text}
      style={[{ color: t.colors.text, borderColor: t.colors.border }, style]} // Applying theme color and border color
      {...props}  // Spread other props (optional)
    />
  );
}

export default ThemedInput

const styles = StyleSheet.create({
 });
