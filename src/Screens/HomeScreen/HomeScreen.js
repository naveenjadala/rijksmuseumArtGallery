import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ArtCard from '../../components/Card/ArtCard';
import {useNavigation} from '@react-navigation/native';
import FlatListLoader from '../../components/Loaders/FlatListLoader';
import useApi from '../../Hooks/useGetApi';
import endpoints from '../../Services/endpoints';
import {storeArtData} from '../../DataBase/storeArtData';
import {setupDatabase} from '../../DataBase/db';
import {retrieveArtIds} from '../../DataBase/retrieveData';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [likedIds, setLikedIds] = useState([]);
  const {data: apiData, loading, error, callApi} = useApi();

  useEffect(() => {
    callApi(endpoints.GET_ALL_ART_API, {p: page});
  }, []);

  const updatedList = result => {
    const updatedArr = result.map(item => ({
      ...item,
      likeFlag: likedIds.includes(item?.objectNumber),
    }));
    return updatedArr;
  };

  useEffect(() => {
    if (apiData) {
      setData(prevData => [...prevData, ...updatedList(apiData)]);
    }
  }, [apiData]);

  const fetchDataFromApi = async () => {
    callApi(endpoints.GET_ALL_ART_API, {p: page});
  };

  //move to app
  useEffect(() => {
    setupDatabase();
  }, []);

  useEffect(() => {
    retrieveArtIds(val => {
      setLikedIds(val);
    });
    fetchDataFromApi();
  }, [page]);

  const redirectToDetails = (detailsId, index) => {
    navigation.navigate('Details', {detailsId});
  };

  const loadMoreData = () => {
    setPage(page + 1);
  };

  const favorite = (detailsId, index) => {
    const updatedArr = data.map(item => {
      if (detailsId?.objectNumber === item?.objectNumber) {
        return {
          ...item,
          likeFlag: !item?.likeFlag,
        };
      }
      return item;
    });
    setData(updatedArr);
    storeArtData(detailsId?.objectNumber, updatedArr[index]);
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
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => <FlatListLoader loading={loading} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
