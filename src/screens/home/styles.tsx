import {StyleSheet} from 'react-native';
import globalStyles from '../../styles/globalStyles';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    ...globalStyles.container,
    padding: 10,
  },
});

export default styles;
