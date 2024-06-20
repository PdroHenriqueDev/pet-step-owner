import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import {LocationProvider} from './contexts/LocationContext';
import './styles/global.css';

function App(): React.JSX.Element {
  return (
    <LocationProvider>
      <Routes />
    </LocationProvider>
  );
}

export default App;
