import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '50%',
    width: '100%',
  },
  markerFixed: {
    left: '47%',
    top: '26%',
    marginLeft: -12,
    marginTop: -24,
    position: 'absolute',
  },
  marker: {
    height: 48,
    width: 48,
  },
  bottomSheetContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
});

export default styles;
