import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const ArtCard = ({item, onClick, favorite}) => {
  const [loading, setLoading] = useState(true);

  const handleLoadEnd = () => {
    setLoading(false);
  };
  return (
    <TouchableOpacity onPress={onClick} style={{...styles.container}}>
      {loading && <ActivityIndicator animating={loading} size="large" />}
      {item?.webImage?.url ? (
        <Image
          source={{uri: item?.webImage?.url}}
          style={{...styles.imgSty}}
          onLoadEnd={handleLoadEnd}
        />
      ) : null}
      <TouchableOpacity style={{...styles.likeBtn}} onPress={favorite}>
        {!item?.likeFlag ? (
          <Icon name="heart-circle" size={32} color="rgba(255, 255, 255, .6)" />
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
    height: 200,
    width: '45%',
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 10,
    elevation: 1,
  },
  imgSty: {
    width: '100%',
    height: 140,
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