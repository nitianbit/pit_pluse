import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CenteredModal from '../CenteredModal'
import { CheckIcon } from '../../assets/svgs';
import ThemeText from '../ThemeText';
import useThemeColor from '../../hooks/useThemeColor';

const PitStop = ({ onSelect = () => { } ,visible,toggleVisible}) => {
    const [selected, setSelected] = React.useState(null);
    const theme=useThemeColor();


    const onSelection = (index) => {
        setSelected(index);
        onSelect(index);
        toggleVisible();
      
    }


    return (
        < >
        
            <CenteredModal title='Select Action' bottom visible={visible} animationType='slide' transparent={true} onClose={toggleVisible}>
                <View style={styles.view}>

                    <TouchableOpacity style={styles.selectCard} onPress={() => onSelection(1)}>
                        <ThemeText style={styles.label} text="Refuel" />
                        {selected === 1 ? <CheckIcon /> : null}
                    </TouchableOpacity>

                    <View style={{ height: 2, backgroundColor: theme.separator }} />

                    <TouchableOpacity style={styles.selectCard} onPress={() => onSelection(2)}>
                        <ThemeText style={styles.label} text="Driver Change" />
                        {selected === 2 ? <CheckIcon /> : null}
                    </TouchableOpacity>

                    <View style={{ height: 2, backgroundColor: theme.separator }} />

                    <TouchableOpacity style={styles.selectCard} onPress={() => onSelection(3)}>
                        <ThemeText style={styles.label} text="Refuel and Driver Change" />
                        {selected === 3 ? <CheckIcon /> : null}
                    </TouchableOpacity>

                </View>
               
            </CenteredModal>
        </>
    )
}

export default PitStop

const styles = StyleSheet.create({
    startButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        borderRadius: 8,
        width: '48%',
        marginBottom: 10,

    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center'
    },

    selectCard: {
        borderRadius: 10,
        padding: 10,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    driverNumber: {
    },
    view: {
        height: 350,
        width: '100%'
    },
})