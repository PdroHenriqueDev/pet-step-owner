import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loadingContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  infomessage: {
    ...globalStyles.label,
    textAlign: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  infoContainer: {
    backgroundColor: colors.primary,
    borderTopWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  time: {
    color: colors.accent,
  },
});

export default styles;
