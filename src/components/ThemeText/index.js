import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useThemeColor from '../../hooks/useThemeColor'

const ThemeText = ({ text = "", style = {}, color = "" }) => {
  const theme = useThemeColor();

  return (
    <Text style={[{ color: color ? color : theme.text }, style]}>{text}</Text>
  )
}

export default ThemeText

const styles = StyleSheet.create({})