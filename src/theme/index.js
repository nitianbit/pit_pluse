import { useColorScheme } from "react-native";
import { COLORS } from "../utils/constants";

const lightTheme = {
    text: COLORS.PRIMARY,
    background: COLORS.LIGHT,
    subText: '#8E8E93',
    separator: '#38383A',
  };
  
  const darkTheme = {
    text: COLORS.LIGHT,
    background: COLORS.DARK,
    subText: '#8E8E93',
    separator: '#38383A',
    card: '#1C1C1E',
  };
  
  const getTheme = () => {
    const colorScheme = useColorScheme();
    return colorScheme === 'dark' ? darkTheme : lightTheme;
  };

  export default getTheme;
  