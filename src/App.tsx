import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import {LocationProvider} from './contexts/locationContext';
import './styles/global.css';
import {DialogProvider} from './contexts/dialogContext';

function App(): React.JSX.Element {
  return (
    <DialogProvider>
      <LocationProvider>
        <Routes />
      </LocationProvider>
    </DialogProvider>
  );
}

export default App;
