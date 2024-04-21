import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParams} from '../typings/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PrivateStack} from './private-stack';
import {SCREENS} from '../constants/screens';

const Stack = createNativeStackNavigator<StackParams>();

export const RootNavigation = () => {
  return (
    <>
      <SafeAreaProvider>
        <Stack.Navigator
          initialRouteName={SCREENS.MAIN_STACK}
          screenOptions={{headerShown: false, orientation: 'portrait'}}>
          <Stack.Screen name={SCREENS.MAIN_STACK} component={PrivateStack} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </>
  );
};
