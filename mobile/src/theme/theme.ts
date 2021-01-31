import { Dimensions } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#FFF',
  secondary: '#FF5733',
  secondaryDark: '#BF4126',
  border: '#EFEFEF',
  shadow: '#E0E0E0',
  text: '#2A2A2A',
  text2: '#6A6A6A',
  placeholder: '#7D7D7D',
  background: '#E8E8E8',

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
  header: {
    fontFamily: 'Regular',
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
    fontFamily: 'SecondaryBold',
    fontSize: SIZES.bigger,
  },
  normal: {
    fontFamily: 'Regular',
    fontSize: SIZES.normal,
  },
  small: {
    fontFamily: 'Regular',
    fontSize: SIZES.small,
  },
  tiny: {
    fontFamily: 'Regular',
    fontSize: SIZES.tiny,
  },
  secondaryHeader: {
    fontFamily: 'SecondaryBold',
    fontSize: SIZES.header,
  },
  secondaryMedium: {
    fontFamily: 'SecondaryMedium',
    fontSize: SIZES.big,
  },
  secondaryRegular: {
    fontFamily: 'SecondaryRegular',
    fontSize: SIZES.normal,
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
};
