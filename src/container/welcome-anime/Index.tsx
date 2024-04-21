import {View, Text, TouchableOpacity} from 'react-native';
import {RootStackScreenProps} from '../../typings/Navigation';
import {SCREENS} from '../../constants/screens';
import FastImage from 'react-native-fast-image';
import {useTailwind} from 'tailwind-rn';
import {AnimePhoto} from '../../assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../constants/colors';

const IndexWelcomeAnimeContainer = ({
  navigation,
}: RootStackScreenProps<SCREENS.WELCOME>) => {
  const tailwind = useTailwind();

  const handleNextScreen = () => {
    console.log('click');
    navigation.navigate(SCREENS.DRAWER_NAVIGATOR);
  };
  return (
    <View style={[tailwind('justify-center items-center'), {flex: 1}]}>
      <FastImage
        style={{width: '100%', flex: 1}}
        source={AnimePhoto}
        resizeMode={FastImage.resizeMode.cover}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: 'lightblue',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          handleNextScreen();
        }}>
        <Text style={{color: 'black'}}>Next Screen</Text>
        <MaterialIcons
          size={14}
          color={COLORS.BLACK}
          name={'arrow-forward-ios'}
          style={[tailwind('')]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IndexWelcomeAnimeContainer;
