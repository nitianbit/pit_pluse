import { Dimensions } from "react-native"

export const COLORS = {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    RED: '#FF0000',
    GREEN: '#00FF00',
    BLUE: '#0000FF',
    GOLDEN: '#FFD700',
    BOTTOM_ACTIVE_COLOR: '#0d6efd',
    BOTTOM_UNACTIVE_COLOR: '#000',

    PRIMARY:'#2A2A2A',
    SECONDARY:'#DC143C',
    ACCENT:'#C0C0C0',
    LIGHT:'#F5F5F5',
    DARK:'#000',
    SUB_BACKGROUND:'#1C1C1E',
    SEPARATOR_DARK:'#38383A',
    SEPARATOR_LIGHT:'#C7C7CC',
    SUB_TEXT:'#8E8E93',
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


export const lightTheme = {
  background: COLORS.LIGHT,
  card: COLORS.WHITE,
  text: COLORS.DARK,
  subText: COLORS.SUB_TEXT,
  separator: COLORS.SEPARATOR_LIGHT,
};

export const darkTheme = {
  background: COLORS.DARK,
  card: COLORS.SUB_BACKGROUND,
  text: COLORS.LIGHT,
  subText: COLORS.SUB_TEXT, //
  separator: COLORS.SEPARATOR_DARK,
};

export const MODAL_TYPE={
  RESET:'RESET',
  SERVICE_STOP_TIME:'SERVICE_STOP_TIME',
}

export const RACE_STATUS={
  NOT_STARTED:0,
  STARTED:1,
  FINISHED:2,
  CANCELLED:3,
  SERVICE_STOP_TIME:'SERVICE_STOP_TIME',
}

export const FLAG_TYPE={
  RED_FLAG:'redFlag',
  BLACK_FLAG:'blackFlag',
  GREEN_FLAG:'greenFlag',
}

export const getFlagTypeString=(flagType)=>{
  switch (flagType) {
    case FLAG_TYPE.RED_FLAG:
      return 'Red Flag';
    case FLAG_TYPE.BLACK_FLAG:
      return 'Black Flag';
    case FLAG_TYPE.GREEN_FLAG:
      return 'Green Flag';
    default:
      return 'N/A';
  }
}