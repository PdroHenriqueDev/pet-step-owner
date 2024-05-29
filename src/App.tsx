import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Routes from './routes';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Routes />
  );
}

export default App;
