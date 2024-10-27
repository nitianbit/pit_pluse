import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemeText from "../ThemeText";
import { COLORS } from "../../utils/constants";
import { useTheme } from "@react-navigation/native";

const CounterButton = ({ value, onDecrement, onIncrement }) => {
    const theme = useTheme();

    return <View style={styles.counterContainer}>
        <ThemeText style={[styles.label]} text={value} />
        <View style={[styles.buttonContainer, { backgroundColor: theme.colors.background }]}>
            <TouchableOpacity style={styles.button} onPress={onDecrement}>
                <ThemeText style={styles.buttonText} text="-" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onIncrement}>
                <ThemeText style={styles.buttonText} text="+" />
            </TouchableOpacity>
        </View>
    </View>
};


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
        // color: COLORS.LIGHT,
        fontSize: 30,
    },
    label: {
        fontSize: 18,
    },
})

export default CounterButton