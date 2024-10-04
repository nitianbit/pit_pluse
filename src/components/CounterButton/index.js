import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemeText from "../ThemeText";
import { COLORS } from "../../utils/constants";

const CounterButton = ({ value, onDecrement, onIncrement }) => (
    <View style={styles.counterContainer}>
        <ThemeText style={[styles.label]} text={value} />
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onDecrement}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onIncrement}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
);


const styles = StyleSheet.create({
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: '#3a3a3c',
    },
    button: {
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.LIGHT,
        fontSize: 30,
    },
    label: {
        fontSize: 18,
    },
})

export default CounterButton