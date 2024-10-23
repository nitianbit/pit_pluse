import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import CenteredModal from '../CenteredModal'
import ThemeText from '../ThemeText'
import { observer } from 'mobx-react-lite'
import raceStore from '../../store/RaceStore'
import driverStore from '../../store/DriverStore'
import { FLAG_TYPE } from '../../utils/constants'
import { showMessage } from 'react-native-flash-message'
import useThemeColor from '../../hooks/useThemeColor'
import { CheckIcon } from '../../assets/svgs'


const DriverChangePopup = ({ visible, toggleVisible, currentDriver }) => {
    const theme = useThemeColor();
    const { data } = raceStore;
    const [driverSeleted, setDriverSelected] = React.useState(null);

    useEffect(() => {
        if (visible) {
            setDriverSelected(currentDriver ?? null);
        }
    }, [visible, currentDriver]);

    const showSuccessMsg = () => {
        //show success message
        showMessage({
            message: 'Flag Raised',
            type: 'success',
        })
    }

    const onChangeDriver = (driver) => {
        setDriverSelected(driver);
    }

    const proceed = () => {
        if (driverSeleted) {
            driverStore.changeCurrentDriver(driverSeleted);
            showSuccessMsg();
            toggleVisible();
            return raceStore.generateLogs(FLAG_TYPE.DRIVER_CHANGE);
        }
    }

    return (
        <CenteredModal title='Select Driver' bottom visible={visible} animationType='slide' transparent={true} onClose={toggleVisible}>
            <View style={styles.view}>

                <FlatList
                    data={data.drivers ?? []}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={{ height: 2, backgroundColor: theme.separator }} />}
                    renderItem={({ item: driver, index }) => {
                        return (
                            <TouchableOpacity style={styles.driverCard} onPress={() => onChangeDriver(index)}>
                                <ThemeText style={styles.driverName} text={driver.name ? driver.name : `Driver ${index + 1}`} />
                                {driverSeleted === index ? <CheckIcon /> : null }
                            </TouchableOpacity>
                        )
                    }}
                    bounces={false}
                />
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: driverSeleted === null ? '#ccc' : '#4A90E2' }]} onPress={proceed} disabled={driverSeleted == null}>
                <ThemeText style={styles.btnText} text='Proceed' />
            </TouchableOpacity>
        </CenteredModal>
    )
}

export default observer(DriverChangePopup);

const styles = StyleSheet.create({
    view: {
        height: 350,
        width: '100%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    driverCard: {
        borderRadius: 10,
        padding: 10,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    driverName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    driverNumber: {
        fontSize: 16
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        borderRadius: 8,
        width: '100%',
        marginVertical: 10
    },
    btnText: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '500',
    }
})