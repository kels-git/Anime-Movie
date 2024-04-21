import {FlatList} from 'react-native';
import {RootStackScreenProps} from '../../typings/Navigation';
import {SCREENS} from '../../constants/screens';
import {AnimeCardComponent, ResponsiveUi} from '../../components';
import {useTailwind} from 'tailwind-rn';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import {ContainerWrapper} from '../../components/wrapper';
import {Anime} from '../../typings/Anime';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../store-features/animeFavorite/animeFavoruiteSlice';
import {addAnimeDetailDisplay} from '../../../store-features/animeDetails/animeDetailsSlice';

const IndexFavouriteAnimeContainer = ({
  navigation,
}: RootStackScreenProps<SCREENS.FAVOURITE>) => {
  const tailwind = useTailwind();

  const Favourite = useSelector(
    (state: RootState) => state.animeFavoruiteSlice.selectedFavorites,
  );

  const dispatch = useDispatch(); // Add this line

  const handleAnimeApi = (item: Anime) => {
    dispatch(addAnimeDetailDisplay(item));
    navigation.navigate(SCREENS.MAIN_STACK, {screen: SCREENS.DETAILS});
  };

  const renderAnimeItem = ({item}: {item: Anime}) => {
    const isFavorite = Favourite.find(favItem => favItem.title === item.title);
    const handleToggleFavorite = (item: Anime) => {
      if (isFavorite) {
        dispatch(removeFromFavorites(item));
      } else {
        dispatch(addToFavorites(item));
      }
    };

    return (
      <AnimeCardComponent
        item={item}
        handleAnimeClick={() => handleAnimeApi(item)}
        favoriteName={isFavorite ? 'favorite' : 'favorite-outline'}
        toggleFavourite={() => handleToggleFavorite(item)}
      />
    );
  };
  return (
    <ContainerWrapper style={[tailwind('ml-3 mr-3 mb-6'), {}]}>
      {Favourite.length === 0 ? (
        <ContainerWrapper
          style={[tailwind('items-center justify-center mt-20')]}>
          <ResponsiveUi.Text>List is Empty</ResponsiveUi.Text>
        </ContainerWrapper>
      ) : (
        <FlatList
          data={Favourite}
          renderItem={renderAnimeItem}
          keyExtractor={(_item, index) => index.toString()}
          contentContainerStyle={[tailwind(''), {paddingHorizontal: 10}]}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
        />
      )}
    </ContainerWrapper>
  );
};

export default IndexFavouriteAnimeContainer;
