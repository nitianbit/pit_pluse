import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useThemeColor from '../../hooks/useThemeColor'
import { useTheme } from '@react-navigation/native';

const ThemeText = ({ text = "", style = {}, color = "" }) => {
  const theme = useThemeColor();
  const t=useTheme()

  return (
    <Text style={[{ color: color ? color : t.colors.text }, style]}>{text}</Text>
  )
}

export default ThemeText

const styles = StyleSheet.create({})