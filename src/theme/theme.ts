import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const COLORS = {
  primary: '#FFFFFF',
  secondary: '#FFC300',
  secondaryLight: '#FFD85B',
  border: '#EFEFEF',
  shadow: '#E0E0E0',
  text: '#2A2A2A',
  text2: '#464646',
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
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,

  big: 20,
  normal: 14,
  small: 12,
  tiny: 10,

  width,
  height,
} as const;

export const FONTS = {
  header: {
    fontFamily: 'Regular',
    fontSize: SIZES.header,
    lineHeight: 44,
  },
  h1: {
    fontFamily: 'Black',
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  h2: {
    fontFamily: 'Bold',
    fontSize: SIZES.h2,
    lineHeight: 30,
  },
  h3: {
    fontFamily: 'Bold',
    fontSize: SIZES.h3,
    lineHeight: 22,
  },
  h4: {
    fontFamily: 'Bold',
    fontSize: SIZES.h4,
    lineHeight: 22,
  },
  big: {
    fontFamily: 'Regular',
    fontSize: SIZES.big,
    lineHeight: 36,
  },
  normal: {
    fontFamily: 'Regular',
    fontSize: SIZES.normal,
    lineHeight: 30,
  },
  small: {
    fontFamily: 'Regular',
    fontSize: SIZES.small,
    lineHeight: 22,
  },
  tiny: {
    fontFamily: 'Regular',
    fontSize: SIZES.tiny,
    lineHeight: 22,
  },
} as const;
