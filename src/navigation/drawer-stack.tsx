import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SCREENS} from '../constants/screens';
import {
  IndexFavouriteAnimeContainer,
  IndexListingAnimeContainer,
} from '../container';
import {StackParams} from '../typings/navigation';
import {BottomNavigationBar} from './bottom-bar-stack';

const Drawer = createDrawerNavigator<StackParams>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.ANIME_LISTING}
      screenOptions={{
        headerShown: true,
        headerStyle: {height: 30},
        headerTitleStyle: {fontSize: 14},
      }}>
      <Drawer.Screen
        name={SCREENS.ANIME_LISTING}
        component={IndexListingAnimeContainer}
      />
      <Drawer.Screen
        name={SCREENS.FAVOURITE}
        component={IndexFavouriteAnimeContainer}
      />
      <Drawer.Screen
        name={SCREENS.HOME_STACK}
        component={BottomNavigationBar}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
