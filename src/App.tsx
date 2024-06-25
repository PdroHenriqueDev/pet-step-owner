import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import {RequestProvider} from './contexts/requestContext';
import './styles/global.css';
import {DialogProvider} from './contexts/dialogContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <DialogProvider>
      <RequestProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <Routes />
        </GestureHandlerRootView>
      </RequestProvider>
    </DialogProvider>
  );
}

export default App;
