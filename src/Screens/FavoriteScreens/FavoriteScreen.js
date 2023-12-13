import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import {retrieveArtData} from '../../DataBase/retrieveData';
import ArtCard from '../../components/Card/ArtCard';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {storeArtData} from '../../DataBase/storeData';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [callBackUpdate, setCallbackUpdate] = useState(false);

  useFocusEffect(
    useCallback(() => {
      retrieveArtData(data => {
        setData(data);
      });
    }, [callBackUpdate]),
  );

  const redirectToDetails = (detailsId, index) => {
    navigation.navigate('Details', {detailsId});
  };

  const favorite = (detailsId, index) => {
    storeArtData(detailsId?.objectNumber, data[index]);
    setCallbackUpdate(prevVal => !prevVal);
  };

  return (
    <SafeAreaView>
      <View style={{margin: 15}}>
        <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ArtCard
              item={item}
              onClick={() => redirectToDetails(item?.objectNumber, index)}
              favorite={() => favorite(item, index)}
            />
          )}
          onEndReachedThreshold={0.1}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});