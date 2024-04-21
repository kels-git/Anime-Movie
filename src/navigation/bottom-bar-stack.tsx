import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTailwind} from 'tailwind-rn/dist';
import {Platform} from 'react-native';
import {SCREENS} from '../constants/screens';
import {COLORS} from '../constants/colors';
import {StackParams} from '../typings/navigation';
import {useAppDimensions} from '../hooks/dimensions';
import {ResponsiveUi} from '../components';
import {ContainerWrapper} from '../components/wrapper';
import {
  IndexAiringAnimeContainer,
  IndexCompleteAnimeContainer,
  IndexUpcomingnimeContainer,
} from '../container';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator<StackParams>();

const NavTitle = ({focused, routeName}: any) => {
  const tailwind = useTailwind();
  const {isLargeScreen, wp} = useAppDimensions();

  return (
    <ContainerWrapper style={[isLargeScreen && {marginLeft: wp(5)}]}>
      {focused ? (
        <ResponsiveUi.Text
          style={[tailwind('text-[0.7rem]'), {color: COLORS.PRIMARY}]}>
          {routeName}
        </ResponsiveUi.Text>
      ) : (
        <ResponsiveUi.Text style={tailwind('text-[0.68rem] text-text')}>
          {routeName}
        </ResponsiveUi.Text>
      )}
    </ContainerWrapper>
  );
};

export const BottomNavigationBar = () => {
  const {wp, hp} = useAppDimensions();

  const bottomNavIcons: Record<string, any> = {
    [SCREENS.AIRING]: {
      true: ({size}: {size: number}) => (
        <Ionicons name="videocam" size={size} color="black" />
      ),
      false: ({size}: {size: number}) => (
        <Ionicons name="videocam-outline" size={size} color="black" />
      ),
    },
    [SCREENS.COMPLETE]: {
      true: ({size}: {size: number}) => (
        <MaterialCommunityIcons
          name="movie-open-check"
          size={size}
          color="black"
        />
      ),
      false: ({size}: {size: number}) => (
        <MaterialCommunityIcons
          name="movie-open-check-outline"
          size={size}
          color="black"
        />
      ),
    },

    [SCREENS.UPCOMING]: {
      true: ({size}: {size: number}) => (
        <AntDesign name="cloudupload" size={size} color="black" />
      ),
      false: ({size}: {size: number}) => (
        <AntDesign name="clouduploado" size={size} color="black" />
      ),
    },
  };

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.AIRING}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: Platform.select({
          android: {
            backgroundColor: 'lightblue',
            height: hp(8.5),
            paddingBottom: hp(1),
            paddingTop: hp(1),
          },
          ios: {
            backgroundColor: 'lightblue',
            height: hp(10),
          },
        }),
        tabBarShowLabel: true,
        tabBarIcon: ({focused}) =>
          bottomNavIcons[route.name][String(focused)]({size: 20}),
        tabBarLabel: ({focused}) => (
          <NavTitle focused={focused} routeName={route.name} />
        ),
      })}>
      <Tab.Screen name={SCREENS.AIRING} component={IndexAiringAnimeContainer} />
      <Tab.Screen
        name={SCREENS.COMPLETE}
        component={IndexCompleteAnimeContainer}
      />
      <Tab.Screen
        name={SCREENS.UPCOMING}
        component={IndexUpcomingnimeContainer}
      />
    </Tab.Navigator>
  );
};
