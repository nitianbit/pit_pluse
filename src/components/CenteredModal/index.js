import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ThemeText from '../ThemeText';
import useThemeColor from '../../hooks/useThemeColor';
import CloseIcon from '../../assets/svgs/CloseIcon';

const CenteredModal = ({ visible, onClose, children, title = "Select" }) => {
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
          <View style={styles.header}>
            {title ? <ThemeText style={[styles.title]} text={title} /> : null}
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <CloseIcon fill={theme.text} />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};
//theme.background ||
export default CenteredModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',  // Center the modal vertically
    alignItems: 'center',  // Center the modal horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark overlay
  },
  modalContent: {
    width: Dimensions.get('window').width * 0.95,  // Modal width is 80% of screen width
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
    paddingHorizontal: 10,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    padding: 10,
    paddingTop: 0,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  }

});
