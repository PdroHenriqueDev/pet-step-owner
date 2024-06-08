import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Routes from './routes';
import { LocationProvider } from './contexts/LocationContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <LocationProvider>
      <Routes />
    </LocationProvider>
  );
}

export default App;
