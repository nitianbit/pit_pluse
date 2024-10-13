import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ThemeText from '../ThemeText';
import useThemeColor from '../../hooks/useThemeColor';

const CenteredModal = ({ visible, onClose, children }) => {
  const theme = useThemeColor();

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: theme.background || 'white' }]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CenteredModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',  // Center the modal vertically
    alignItems: 'center',  // Center the modal horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark overlay
  },
  modalContent: {
    width: Dimensions.get('window').width * 0.8,  // Modal width is 80% of screen width
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',  // Center items in modal
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

});
