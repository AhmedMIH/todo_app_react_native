import {Platform} from 'react-native';
const font = Platform.select({
  ios: {
    Heavy: 'Muller-Bold',
    Medium: 'Muller-Medium',
    Regular: 'Muller-Regular',
    Light: 'Muller-Light',
  },
  android: {
    Heavy: 'Muller-Bold',
    Medium: 'Muller-Medium',
    Regular: 'Muller-Regular',
    Light: 'Muller-Light',
  },
});

// generate styles for a font with given weight and style
export const fontMaker = weight => {
  return {
    fontFamily: font[weight],
  };
};
