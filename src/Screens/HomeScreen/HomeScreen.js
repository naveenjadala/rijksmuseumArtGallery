import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ArtCard from '../../components/Card/ArtCard';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import FlatListLoader from '../../components/Loaders/FlatListLoader';
import useApi from '../../Hooks/useGetApi';
import endpoints from '../../Services/endpoints';
import {storeArtData} from '../../DataBase/storeArtData';
// import {setupDatabase} from '../../DataBase/db';
import {retrieveArtIds} from '../../DataBase/retrieveData';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFavList,
  removeFromFavList,
  updateFavList,
} from '../../Redux/slice/FavListSlice';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [likedIds, setLikedIds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {data: apiData, loading, error, callApi} = useApi();
  const favoriteData = useSelector(state => state?.Favorites?.favList);

  useEffect(() => {
    favListUpdates();
    callApi(endpoints.GET_ALL_ART_API, {p: page});
  }, []);

  const updatedList = result => {
    const updatedArr = result.map(item => ({
      ...item,
      likeFlag: favoriteData.includes(item?.objectNumber),
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

  const favListUpdates = () => {
    retrieveArtIds(val => {
      setLikedIds(val);
      dispatch(updateFavList(val));
    });
  };

  //move to app
  // useEffect(() => {
  //   setupDatabase();
  // }, []);

  useEffect(() => {
    // favListUpdates();
    fetchDataFromApi();
  }, [page]);

  const redirectToDetails = (detailsId, index) => {
    navigation.navigate('Details', {detailsId});
  };

  const loadMoreData = () => {
    if (!loading && !refreshing) {
      setPage(prevPage => prevPage + 1);
    }
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
    if (detailsId?.likeFlag) {
      dispatch(removeFromFavList(detailsId?.objectNumber));
    } else {
      dispatch(addFavList(detailsId?.objectNumber));
    }
    storeArtData(detailsId?.objectNumber, updatedArr[index]);
  };

  useFocusEffect(
    useCallback(() => {
      // favListUpdates();
      handleRefresh();
    }, []),
  );

  const handleRefresh = () => {
    setData([]);
    // callApi(endpoints.GET_ALL_ART_API, {p: 1});
    setPage(1);
    setRefreshing(false);
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
