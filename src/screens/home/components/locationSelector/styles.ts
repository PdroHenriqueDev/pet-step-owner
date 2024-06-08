import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import globalStyles from "../../../../styles/globalStyles";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
      ...globalStyles.button,
      width: '90%',
      marginBottom: 20,
    },
    markerFixed: {
      left: '50%',
      marginLeft: -24,
      marginTop: -48,
      position: 'absolute',
      top: '50%'
    },
    marker: {
      height: 48,
      width: 48
    },
  });

export default styles;