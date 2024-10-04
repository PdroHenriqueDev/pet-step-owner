import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerFixed: {
    left: '50%',
    top: '55%',
    marginLeft: -24,
    marginTop: -36,
    position: 'absolute',
  },
  marker: {
    height: 48,
    width: 48,
  },
  bottomSheetContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export default styles;
