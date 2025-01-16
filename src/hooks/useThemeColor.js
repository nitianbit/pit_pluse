import { useEffect, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../utils/constants';

//This is for managing self colors for light and dark mode
const useThemeColor = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });

    return () => subscription.remove();
  }, [darkTheme, lightTheme]);

  return theme;
};

export default useThemeColor;
