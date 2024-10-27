import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DarkMode, LightMode, ResetSvg } from '../../assets/svgs'
import useThemeColor from '../../hooks/useThemeColor'
import themeService, { THEME } from '../../store/themeStore'
import { observer } from 'mobx-react-lite'
import { MODAL_TYPE } from '../../utils/constants'

const TopMenu = ({ openModal, closeModal }) => {
  const theme = useThemeColor();
  const { currentTheme } = themeService;


  return (
    <View style={styles.menuRow}>
      <TouchableOpacity style={[styles.modeChangeBtn, styles.btn]} onPress={themeService.toggleTheme}  >
        {currentTheme === THEME.LIGHT ? <DarkMode fill={theme.text} /> : <LightMode fill={theme.text} />}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.resetBtn, styles.btn]} onPress={() => openModal(MODAL_TYPE.RESET, true)}>
        <ResetSvg fill={theme.text} />
      </TouchableOpacity>
    </View>
  )
}

export default observer(TopMenu);

const styles = StyleSheet.create({
  menuRow: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  modeChangeBtn: {

  },
  resetBtn: {

  },
  btn: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 50
  }
})