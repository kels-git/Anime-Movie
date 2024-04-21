import {ParamListBase, RouteProp} from '@react-navigation/native';
import {SCREENS} from '../constants/screens';
// import {StackNavigationProp} from '@react-navigation/stack';

interface ISubNavigator<T extends ParamListBase, K extends keyof T> {
  screen: K;
  params?: T[K];
  initial?: boolean;
}

export type HomeStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.AIRING]: undefined;
  [SCREENS.COMPLETE]: undefined;
  [SCREENS.UPCOMING]: undefined;
};
export type DrawerStackParamList = {
  [SCREENS.ANIME_LISTING]: undefined;
  [SCREENS.FAVOURITE]: undefined;
};

export type RootStackParamList = {
  [SCREENS.MAIN_STACK]: undefined;
  [SCREENS.WELCOME]: undefined;
  [SCREENS.DETAILS]: undefined;

  [SCREENS.HOME_STACK]: ISubNavigator<
    HomeStackParamList,
    keyof HomeStackParamList
  >;

  [SCREENS.DRAWER_NAVIGATOR]: ISubNavigator<
    DrawerStackParamList,
    keyof DrawerStackParamList
  >;
};

export type StackParams = RootStackParamList &
  HomeStackParamList &
  DrawerStackParamList;

export type RootStackScreenProps<T extends keyof StackParams> = {
  navigation?: any;
  route: RouteProp<StackParams, keyof StackParams>;
};

// export type StackParams = RootStackParamList & HomeStackParamList;

// export type RootStackScreenProps<T extends keyof StackParams> = {
//   navigation?: any;
//   route: RouteProp<StackParams, T>;
// };
