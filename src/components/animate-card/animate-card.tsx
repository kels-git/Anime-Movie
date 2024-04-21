import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {ContainerWrapper} from '../../components/wrapper';
import {useTailwind} from 'tailwind-rn';
import {ResponsiveUi} from '../../components';
import {COLORS} from '../../constants/colors';
import FastImage from 'react-native-fast-image';
import {Anime} from '../../typings/Anime';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AnimeCardProps {
  item: Anime;
  handleAnimeClick?: (item: Anime) => void;
  favoriteName?: string;
  toggleFavourite?: (item: Anime) => void;
}

const AnimeCardComponent: React.FC<AnimeCardProps> = React.memo(
  ({item, handleAnimeClick, favoriteName, toggleFavourite}) => {
    const tailwind = useTailwind();
    const {title, rating, score, year, status, image_url} = item;
    const imageUrl = image_url;
    const extractedTitle = Array.isArray(title) ? title[0] : title;

    return (
      <TouchableOpacity
        onPress={() => handleAnimeClick?.(item)}
        activeOpacity={0.8}>
        {!imageUrl ? (
          <ContainerWrapper
            style={[
              tailwind('mt-3 flex-row items-center mb-1'),
              {
                padding: 10,
                borderRadius: 15,
                backgroundColor: COLORS.WHITE,
                elevation: 2,
              },
            ]}>
            <FastImage
              style={{width: 55, height: 75, borderRadius: 5}}
              source={{uri: imageUrl, priority: FastImage.priority.normal}}
              resizeMode={FastImage.resizeMode.cover}
            />
            <ContainerWrapper style={{marginLeft: 10}}>
              <ResponsiveUi.Text h7 style={{fontWeight: 'bold'}}>
                {extractedTitle}
              </ResponsiveUi.Text>
              <ResponsiveUi.Text h8>Rating: {rating}</ResponsiveUi.Text>
              <ResponsiveUi.Text h8>Score: {score}/10</ResponsiveUi.Text>
              <ResponsiveUi.Text h8>Year: {year}</ResponsiveUi.Text>
              <ResponsiveUi.Text h8 style={{}}>
                Status:{' '}
                <ContainerWrapper
                  style={{
                    backgroundColor:
                      status === 'Not yet aired'
                        ? 'yellow'
                        : status === 'Currently Airing'
                        ? 'green'
                        : 'red',
                    width: '40%',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}>
                  <ResponsiveUi.Text
                    h8
                    style={{
                      color:
                        status === 'Not yet aired'
                          ? 'black'
                          : status === 'Currently Airing'
                          ? 'white'
                          : 'white',
                      fontWeight: 'bold',
                      marginHorizontal: 10,
                      marginVertical: 3,
                    }}>
                    {status}
                  </ResponsiveUi.Text>
                </ContainerWrapper>
              </ResponsiveUi.Text>
              <ContainerWrapper style={[tailwind('flex-row items-center')]}>
                <ResponsiveUi.Text h8>Favorite</ResponsiveUi.Text>
                <TouchableOpacity
                  onPress={() => toggleFavourite?.(item)}
                  style={{marginHorizontal: 3, marginVertical: 3}}>
                  <MaterialIcons
                    size={26}
                    color={COLORS.ERROR}
                    name={favoriteName || 'favorite-border'}
                    style={[tailwind('')]}
                  />
                </TouchableOpacity>
              </ContainerWrapper>
            </ContainerWrapper>
          </ContainerWrapper>
        ) : (
          <ContainerWrapper
            style={[
              tailwind('mt-3 flex-row items-center mb-1'),
              {
                padding: 10,
                borderRadius: 15,
                backgroundColor: COLORS.WHITE,
                elevation: 2,
              },
            ]}>
            <FastImage
              style={{width: 55, height: 75, borderRadius: 5}}
              source={{uri: imageUrl}}
              resizeMode={FastImage.resizeMode.cover}
            />
            <ContainerWrapper style={{marginLeft: 10}}>
              <ResponsiveUi.Text h7 style={{fontWeight: 'bold'}}>
                {extractedTitle}
              </ResponsiveUi.Text>
              <ResponsiveUi.Text h8>Rating: {rating}</ResponsiveUi.Text>
              <ResponsiveUi.Text h8>Score: {score}/10</ResponsiveUi.Text>
              <ResponsiveUi.Text h8>Year: {year}</ResponsiveUi.Text>

              <ResponsiveUi.Text h8 style={{}}>
                Status:{' '}
                <ContainerWrapper
                  style={{
                    backgroundColor:
                      status === 'Not yet aired'
                        ? 'yellow'
                        : status === 'Currently Airing'
                        ? 'green'
                        : 'red',
                    width: '40%',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}>
                  <ResponsiveUi.Text
                    h8
                    style={{
                      color:
                        status === 'Not yet aired'
                          ? 'black'
                          : status === 'Currently Airing'
                          ? 'white'
                          : 'white',
                      fontWeight: 'bold',
                      marginHorizontal: 10,
                      marginVertical: 3,
                    }}>
                    {status}
                  </ResponsiveUi.Text>
                </ContainerWrapper>
              </ResponsiveUi.Text>
              <ContainerWrapper style={[tailwind('flex-row items-center')]}>
                <ResponsiveUi.Text h8>Favorite</ResponsiveUi.Text>
                <TouchableOpacity
                  onPress={() => toggleFavourite?.(item)}
                  style={{marginHorizontal: 3, marginVertical: 3}}>
                  <MaterialIcons
                    size={26}
                    color={COLORS.ERROR}
                    name={favoriteName || 'favorite-border'}
                    style={[tailwind('')]}
                  />
                </TouchableOpacity>
              </ContainerWrapper>
            </ContainerWrapper>
          </ContainerWrapper>
        )}
      </TouchableOpacity>
    );
  },
);

export default AnimeCardComponent;
