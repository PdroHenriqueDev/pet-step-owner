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
import {AuthProvider} from './contexts/authContext';

function App(): React.JSX.Element {
  return (
    <StripeProvider publishableKey={Config.STRIPE_PUBLISHABLE_KEY ?? ''}>
      <AuthProvider>
        <OwnerProvider>
          <DialogProvider>
            <RequestProvider>
              <GestureHandlerRootView style={{flex: 1}}>
                <Routes />
              </GestureHandlerRootView>
            </RequestProvider>
          </DialogProvider>
        </OwnerProvider>
      </AuthProvider>
    </StripeProvider>
  );
}

export default App;
