import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ContainerWrapper} from '../../components/wrapper';
import {useTailwind} from 'tailwind-rn';
import {ResponsiveUi} from '../../components';
import {RootStackScreenProps} from '../../typings/navigation';
import {SCREENS} from '../../constants/screens';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants/colors';

interface Anime {
  mal_id: number;
  title: string;
  rating: string;
  score: number;
  year: number;
  status: string;
  image_url: string | undefined;
}
const IndexDetailAnimeContainer = ({
  navigation,
}: RootStackScreenProps<SCREENS.DETAILS>) => {
  const animeDetails = useSelector(
    (state: RootState) => state.animeDetailSlice.animeDetails,
  );
  console.log('animal slice', animeDetails);
  const tailwind = useTailwind();

  return (
    <ContainerWrapper style={[tailwind('flex-1 ml-3 mr-3 mt-5'), {}]}>
      <ContainerWrapper style={[tailwind(''), {}]}>
        <ContainerWrapper style={[tailwind('flex-row'), {}]}>
          <TouchableOpacity
            style={[tailwind('flex-row items-center'), {flex: 1}]}
            onPress={() => navigation.goBack()}>
            <AntDesign
              size={24}
              color={COLORS.BLACK}
              name={'arrowleft'}
              style={[tailwind('')]}
            />
          </TouchableOpacity>

          <ContainerWrapper style={[tailwind('ml-10'), {flex: 3}]}>
            <ResponsiveUi.Text h4 color={COLORS.BLACK}>
              Details Anime
            </ResponsiveUi.Text>
          </ContainerWrapper>
        </ContainerWrapper>
      </ContainerWrapper>

      <ScrollView
        contentContainerStyle={[
          tailwind('mt-5'),
          {width: '100%', height: '100%'},
        ]}
        showsVerticalScrollIndicator={false}>
        <FastImage
          style={{
            width: '90%',
            height: '50%',
            borderRadius: 5,
            alignSelf: 'center',
          }}
          source={{
            uri: animeDetails.image_url,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.stretch}
          onError={() => console.log('FastImage Error')}
        />

        <ContainerWrapper style={[tailwind('mt-5')]}>
          <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
            <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-regular">
              Anime Id:{' '}
            </ResponsiveUi.Text>
            <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-bold">
              {animeDetails.mal_id}
            </ResponsiveUi.Text>
          </ContainerWrapper>

          <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
            <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-regular">
              Year:{' '}
            </ResponsiveUi.Text>
            <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-bold">
              {animeDetails.year === null ? 'No year' : animeDetails.year}
            </ResponsiveUi.Text>
          </ContainerWrapper>
          <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
            <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-regular">
              Score:{' '}
            </ResponsiveUi.Text>
            <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-bold">
              {animeDetails.score === null ? '0/10' : animeDetails.score}
            </ResponsiveUi.Text>
          </ContainerWrapper>
          <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
            <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-regular">
              Status:{' '}
            </ResponsiveUi.Text>
            <ResponsiveUi.Text
              h6
              color={COLORS.BLACK}
              tailwind="font-bold"
              style={{
                backgroundColor:
                  animeDetails.status === 'Not yet aired'
                    ? 'yellow'
                    : animeDetails.status === 'Currently Airing'
                    ? 'green'
                    : 'red',
                borderRadius: 5,
                color:
                  animeDetails.status === 'Not yet aired'
                    ? 'black'
                    : animeDetails.status === 'Currently Airing'
                    ? 'white'
                    : 'white',
                fontWeight: 'bold',
                paddingHorizontal: 10,
                paddingVertical: 3,
              }}>
              {animeDetails.status}
            </ResponsiveUi.Text>
          </ContainerWrapper>
          <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
            <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-regular">
              Rating:{' '}
            </ResponsiveUi.Text>
            <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-bold">
              {animeDetails.rating}
            </ResponsiveUi.Text>
          </ContainerWrapper>

          <ContainerWrapper style={[tailwind('flex-row ml-2')]}>
            <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-regular">
              Title:{' '}
            </ResponsiveUi.Text>
            <ResponsiveUi.Text h6 color={COLORS.BLACK} tailwind="font-bold">
              {animeDetails.title}
            </ResponsiveUi.Text>
          </ContainerWrapper>
        </ContainerWrapper>
      </ScrollView>
    </ContainerWrapper>
  );
};

export default IndexDetailAnimeContainer;
