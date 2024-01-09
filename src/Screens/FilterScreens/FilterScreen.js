import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import FlatListLoader from '../../components/Loaders/FlatListLoader';
import ArtCard from '../../components/Card/ArtCard';
import FilterModal from '../../components/Modal/FilterModal';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {storeArtData} from '../../DataBase/storeArtData';
import {retrieveArtIds} from '../../DataBase/retrieveData';
import _debounce from 'lodash/debounce';
import {
  addFavList,
  removeFromFavList,
  updateFavList,
} from '../../Redux/slice/FavListSlice';
import endpoints from '../../Services/endpoints';
import useApi from '../../Hooks/useGetApi';
import FilterIconComponent from '../../components/FilterIconComponent';

const FilterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearchBarFocused, setSearchBarFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const {data: apiData, loading: loadApi, error, callApi} = useApi();
  const selectedData = useSelector(state => state?.Filters?.filter);
  const favoriteData = useSelector(state => state?.Favorites?.favList);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const favListUpdates = () => {
    retrieveArtIds(val => {
      // setLikedIds(val);
      dispatch(updateFavList(val));
    });
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  const updateList = result => {
    const updatedArr = result?.map(item => ({
      ...item,
      likeFlag: favoriteData.includes(item?.objectNumber),
    }));
    return updatedArr;
  };

  const fetchDataFromApi = async () => {
    callApi(
      endpoints.GET_ALL_ART_API,
      {
        p: page,
        q: searchQuery,
        ...selectedData,
      },
      '',
    );
  };

  useEffect(() => {
    favListUpdates();
    if (apiData) {
      if (page > 1) {
        setData(prevData => [...prevData, ...updateList(apiData?.artObjects)]);
      } else {
        setData(updateList(apiData?.artObjects));
      }
    }
  }, [apiData]);

  useEffect(() => {
    if (Object.entries(selectedData).length > 0) {
      if (page === 1) {
        fetchDataFromApi();
      } else {
        setPage(1);
      }
    }
  }, [selectedData]);

  useEffect(() => {
    if (page > 1) {
      fetchDataFromApi();
    }
  }, [page]);

  // debounced search removing unwanted input noise
  const debouncedSearch = _debounce(async searchQur => {
    if (searchQur.length > 3 || searchQur.length === 0) {
      if (page === 1) {
        fetchDataFromApi();
      } else {
        setPage(1);
      }
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const loadMoreData = () => {
    if (!loadApi && !refreshing) {
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

  const redirectToDetails = (detailsId, index) => {
    navigation.navigate('Details', {detailsId});
  };

  useFocusEffect(
    useCallback(() => {
      handleRefresh();
    }, []),
  );

  const handleRefresh = () => {
    fetchDataFromApi();
    setPage(1);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <View style={{...styles.container}}>
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              onTouchCancel={() => setPage(0)}
              onClearIconPress={() => setPage(0)}
              style={{...styles.searchBarSty}}
              onFocus={() => setSearchBarFocused(true)}
              onBlur={() => setSearchBarFocused(false)}
            />
            <FilterIconComponent
              toggleModal={toggleModal}
              selectedData={selectedData || ''}
            />
          </View>
          <View style={{...styles.listContainer}}>
            <FlatList
              data={data}
              numColumns={2}
              keyExtractor={item => item.objectNumber.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <ArtCard
                  item={item}
                  onClick={() => redirectToDetails(item?.objectNumber, index)}
                  favorite={() => favorite(item, index)}
                />
              )}
              onEndReached={!isSearchBarFocused ? loadMoreData : null}
              onEndReachedThreshold={0.1}
              // eslint-disable-next-line react/no-unstable-nested-components
              ListFooterComponent={() => <FlatListLoader loading={loadApi} />}
              ListEmptyComponent={
                <View style={{...styles.emptyTxt}}>
                  <Text>No data available</Text>
                </View>
              }
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
          </View>
          <FilterModal
            toggleModal={() => toggleModal()}
            isModalVisible={isModalVisible}
            selectedData={selectedData || ''}
          />
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    margin: 15,
    height: '85%',
  },
  searchBarSty: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
  },
  img: {
    height: 20,
    width: 20,
  },
  emptyTxt: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
