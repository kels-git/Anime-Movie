import React from 'react';
import {RootStackParamList} from '../typings/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../constants/screens';
import {
  IndexDetailAnimeContainer,
  IndexWelcomeAnimeContainer,
} from '../container';
import {BottomNavigationBar} from './bottom-bar-stack';
import DrawerNavigator from './drawer-stack';
import {NavigationProp} from '@react-navigation/native';

interface NavigationProps {
  navigation: NavigationProp<RootStackParamList>;
}
const Stack = createNativeStackNavigator<RootStackParamList>();
export const PrivateStack: React.FC<NavigationProps> = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.WELCOME}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name={SCREENS.WELCOME}
        component={IndexWelcomeAnimeContainer}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={SCREENS.DETAILS}
        component={IndexDetailAnimeContainer}
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name={SCREENS.HOME_STACK}
        component={BottomNavigationBar}
        options={{}}
      />

      <Stack.Screen
        name={SCREENS.DRAWER_NAVIGATOR}
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
