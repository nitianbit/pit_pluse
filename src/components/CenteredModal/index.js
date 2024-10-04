import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ThemeText from '../ThemeText';

const CenteredModal = ({ visible, onClose, children }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose} 
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',  // Center items in modal
  },
 
});
