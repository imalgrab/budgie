import { Dimensions } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  statusBar: '#D9D9D9',
  primary: '#FFF',
  secondary: '#FF5733',
  secondaryDark: '#BF4126',
  border: '#EFEFEF',
  shadow: '#E0E0E0',
  text: '#2A2A2A',
  text2: '#6A6A6A',
  placeholder: '#7D7D7D',
  background: '#F2F2F2',

  white: '#FFF',
  black: '#000',
} as const;

export const SIZES = {
  base: 8,
  font: 14,
  padding: 10,
  padding2: 12,

  header: 40,
  h1: 32,
  h2: 26,
  h3: 22,
  h4: 18,

  big: 20,
  bigger: 18,
  normal: 16,
  small: 14,
  tiny: 12,

  width,
  height,
} as const;

export const FONTS = {
  regular: {
    fontFamily: 'Regular',
  },
  medium: {
    fontFamily: 'Medium',
  },
  light: {
    fontFamily: 'Light',
  },
  thin: {
    fontFamily: 'Thin',
  },
  bold: {
    fontFamily: 'Bold',
  },
  black: {
    fontFamily: 'Black',
  },
  header: {
    fontFamily: 'Bold',
    fontSize: SIZES.header,
  },
  h1: {
    fontFamily: 'Black',
    fontSize: SIZES.h1,
  },
  h2: {
    fontFamily: 'Bold',
    fontSize: SIZES.h2,
  },
  h3: {
    fontFamily: 'Bold',
    fontSize: SIZES.h3,
  },
  h4: {
    fontFamily: 'Bold',
    fontSize: SIZES.h4,
  },
  big: {
    fontFamily: 'Medium',
    fontSize: SIZES.big,
  },
  bolder: {
    fontFamily: 'Medium',
    fontSize: SIZES.normal,
  },
  bigger: {
    fontFamily: 'Medium',
    fontSize: SIZES.bigger,
  },
  normal: {
    fontFamily: 'Regular',
    fontSize: SIZES.normal,
  },
  small: {
    fontFamily: 'Light',
    fontSize: SIZES.small,
  },
  tiny: {
    fontFamily: 'Thin',
    fontSize: SIZES.tiny,
  },
} as const;

export const STYLES = {
  flex1: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
} as const;

export const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.secondary,
    text: COLORS.text,
    background: COLORS.background,
    placeholder: COLORS.placeholder,
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: FONTS.regular,
    medium: FONTS.medium,
    light: FONTS.light,
    thin: FONTS.thin,
  },
};

export const altTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: COLORS.secondary,
  },
};
