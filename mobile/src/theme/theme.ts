import { Dimensions } from 'react-native';
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
    // lineHeight: 44,
  },
  h1: {
    fontFamily: 'Black',
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  h2: {
    fontFamily: 'Bold',
    fontSize: SIZES.h2,
    // lineHeight: 30,
  },
  h3: {
    fontFamily: 'Bold',
    fontSize: SIZES.h3,
    // lineHeight: 22,
  },
  h4: {
    fontFamily: 'Bold',
    fontSize: SIZES.h4,
    // lineHeight: 22,
  },
  big: {
    fontFamily: 'Medium',
    fontSize: SIZES.big,
    // lineHeight: 36,
  },
  bolder: {
    fontFamily: 'Medium',
    fontSize: SIZES.normal,
    // lineHeight: 30,
  },
  bigger: {
    fontFamily: 'Regular',
    fontSize: SIZES.bigger,
    // lineHeight: 30,
  },
  normal: {
    fontFamily: 'Regular',
    fontSize: SIZES.normal,
    // lineHeight: 30,
  },
  small: {
    fontFamily: 'Regular',
    fontSize: SIZES.small,
    // lineHeight: 22,
  },
  tiny: {
    fontFamily: 'Regular',
    fontSize: SIZES.tiny,
    // lineHeight: 22,
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
