import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigation} from './src/navigation/root-stack';
import utilities from './tailwind.json';
import {TailwindProvider} from 'tailwind-rn';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from './store/store';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <TailwindProvider utilities={utilities}>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </TailwindProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
