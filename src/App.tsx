import 'react-native-gesture-handler';
import './styles/global.css';
import React from 'react';
import Routes from './routes';
import {RequestProvider} from './contexts/requestContext';
import {DialogProvider} from './contexts/dialogContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {OwnerProvider} from './contexts/ownerContext';
import {StripeProvider} from '@stripe/stripe-react-native';
import Config from 'react-native-config';

function App(): React.JSX.Element {
  return (
    <StripeProvider publishableKey={Config.STRIPE_PUBLISHABLE_KEY ?? ''}>
      <OwnerProvider>
        <DialogProvider>
          <RequestProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <Routes />
            </GestureHandlerRootView>
          </RequestProvider>
        </DialogProvider>
      </OwnerProvider>
    </StripeProvider>
  );
}

export default App;
