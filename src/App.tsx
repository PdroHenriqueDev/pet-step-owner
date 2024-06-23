import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import {LocationProvider} from './contexts/locationContext';
import './styles/global.css';
import {DialogProvider} from './contexts/dialogContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <DialogProvider>
      <LocationProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <Routes />
        </GestureHandlerRootView>
      </LocationProvider>
    </DialogProvider>
  );
}

export default App;
