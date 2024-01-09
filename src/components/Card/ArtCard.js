import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import unlike from '../../assets/Images/unlike.png';
import like from '../../assets/Images/like.png';

const {height, width} = Dimensions.get('screen');

const ArtCard = ({item, onClick, favorite}) => {
  const [loading, setLoading] = useState(true);

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <TouchableOpacity onPress={onClick} style={{...styles.container}}>
      {loading && (
        <View style={{...styles.imgSty}}>
          <ActivityIndicator animating={loading} size="large" />
        </View>
      )}
      {item?.webImage?.url ? (
        <Image
          source={{uri: item?.webImage?.url}}
          style={{...styles.imgSty}}
          onLoadEnd={handleLoadEnd}
          resizeMode="cover"
        />
      ) : null}
      <TouchableOpacity style={{...styles.likeBtn}} onPress={favorite}>
        {!item?.likeFlag ? (
          Platform.OS === 'ios' ? (
            <Image source={unlike} style={{height: 20, width: 20}} />
          ) : (
            <Icon
              name="heart-circle"
              size={32}
              color="rgba(255, 255, 255, .6)"
            />
          )
        ) : Platform.OS === 'ios' ? (
          <Image source={like} style={{height: 20, width: 20}} />
        ) : (
          <Icon name="heart-circle" size={32} color="#ED2939" />
        )}
      </TouchableOpacity>
      <Text ellipsizeMode="tail" numberOfLines={2} style={{...styles.titleSty}}>
        {item?.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ArtCard;

const styles = StyleSheet.create({
  container: {
    width: '45%',
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 10,
    elevation: 1,
    paddingBottom: 5,
  },
  imgSty: {
    width: '100%',
    height: height / 4,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleSty: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  likeBtn: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
});
