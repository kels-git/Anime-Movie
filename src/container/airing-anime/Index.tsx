import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import {RootStackScreenProps} from '../../typings/Navigation';
import {SCREENS} from '../../constants/screens';
import {AnimeCardComponent, ResponsiveUi} from '../../components';
import {useTailwind} from 'tailwind-rn';
import {Anime} from '../../typings/Anime';
import useAnimeList from '../useAnimeList';
import {ContainerWrapper} from '../../components/wrapper';
import {useDispatch, useSelector} from 'react-redux';
import {addAnimeDetailDisplay} from '../../../store-features/animeDetails/animeDetailsSlice';
import {useQueryClient} from 'react-query';
import {RootState} from '../../../store/rootReducer';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../store-features/animeFavorite/animeFavoruiteSlice';

const IndexAiringAnimeContainer = ({
  navigation,
}: RootStackScreenProps<SCREENS.AIRING>) => {
  const tailwind = useTailwind();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {data, fetchNextPage, isLoading, isError, hasNextPage} = useAnimeList();
  const [fetchFirstPage, setFetchFirstPage] = useState(false);
  const selectedFavorites = useSelector(
    (state: RootState) => state.animeFavoruiteSlice.selectedFavorites,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAnimeApi = (item: Anime) => {
    console.log('details item--', typeof item);
    dispatch(addAnimeDetailDisplay(item));
    navigation.navigate(SCREENS.MAIN_STACK, {screen: SCREENS.DETAILS});
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (fetchFirstPage) {
      // Set a timer to delay fetching the next page by 30 seconds
      timerId = setTimeout(() => {
        fetchNextPage();
        setFetchFirstPage(false); // Reset firstPage after initial fetch
      }, 30000); // 30 seconds delay (in milliseconds)
    }

    // Clean up the timer and cancel ongoing API calls when the component is unmounted
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
      // Cancel ongoing queries associated with the screen
      queryClient.cancelQueries('animeList');
    };
  }, [fetchFirstPage, fetchNextPage]);

  const handleToggleFavorite = (item: Anime) => {
    if (isFavorite(item)) {
      dispatch(removeFromFavorites(item));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  const isFavorite = (item: Anime) => {
    return selectedFavorites.some(favItem => favItem.title === item.title);
  };

  const filteredData = data?.pages
    .flatMap(page => page?.data)
    .filter(
      item =>
        item.status === 'Currently Airing' &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const renderAnimeItem = ({item}: {item: Anime}) => {
    return (
      <AnimeCardComponent
        item={item}
        handleAnimeClick={() => handleAnimeApi(item)}
        favoriteName={isFavorite(item) ? 'favorite' : 'favorite-outline'}
        toggleFavourite={() => handleToggleFavorite(item)}
      />
    );
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleReload = () => {
    // Manually trigger a fetch/reload when an error occurs
    fetchNextPage();
  };

  if (isLoading && !data) {
    return (
      <ContainerWrapper
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="blue" />
      </ContainerWrapper>
    );
  }

  if (isError) {
    return (
      <ContainerWrapper
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ResponsiveUi.Text>Error fetching anime data</ResponsiveUi.Text>
        <TouchableOpacity onPress={handleReload}>
          <ResponsiveUi.Text style={{color: 'blue', marginTop: 10}}>
            Tap to reload
          </ResponsiveUi.Text>
        </TouchableOpacity>
      </ContainerWrapper>
    );
  }

  const renderFooter = () => {
    return (
      <ContainerWrapper style={{alignItems: 'center', marginTop: 20}}>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <ResponsiveUi.Text style={{fontSize: 16, color: '#000'}}>
            {!hasNextPage ? (
              'No more data'
            ) : (
              <ActivityIndicator size="large" color="blue" />
            )}
          </ResponsiveUi.Text>
        )}
      </ContainerWrapper>
    );
  };

  return (
    <ContainerWrapper style={[tailwind('ml-3 mr-3'), {}]}>
      <ContainerWrapper style={{marginTop: 3}}>
        <TextInput
          style={{
            height: 35,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 20,
            paddingLeft: 10,
          }}
          placeholder="Search anime..."
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </ContainerWrapper>
      <FlatList
        data={filteredData}
        renderItem={renderAnimeItem}
        keyExtractor={(_item, index) => index.toString()}
        contentContainerStyle={[tailwind(''), {paddingHorizontal: 10}]}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </ContainerWrapper>
  );
};

export default IndexAiringAnimeContainer;
