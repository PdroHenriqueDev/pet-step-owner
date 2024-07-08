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
    top: '50%',
    marginLeft: -24,
    marginTop: -18,
    position: 'absolute',
  },
  marker: {
    height: 48,
    width: 48,
  },
});

export default styles;
