import { Dimensions } from "react-native"

export const COLORS = {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    RED: '#FF0000',
    GREEN: '#00FF00',
    BLUE: '#0000FF',
    GOLDEN: '#FFD700',
    BOTTOM_ACTIVE_COLOR: '#73FBFD',
    BOTTOM_UNACTIVE_COLOR: '#000'
}

export const DIMENSIONS = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
}

export const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };