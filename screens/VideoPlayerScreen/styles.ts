import {screenWidth} from '@/constants/dimension';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: screenWidth,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
