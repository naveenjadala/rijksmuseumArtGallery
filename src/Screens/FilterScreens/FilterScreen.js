import {
  Alert,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import FlatListLoader from '../../components/Loaders/FlatListLoader';
import ArtCard from '../../components/Card/ArtCard';
import Icon from 'react-native-vector-icons/Ionicons';
import FilterModal from '../../components/Modal/FilterModal';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {storeArtData} from '../../DataBase/storeArtData';
import {retrieveArtIds} from '../../DataBase/retrieveData';
import {getAllCollections} from '../../Services/services';
import FilterIcon from '../../assets/Images/filter.png';
import _debounce from 'lodash/debounce';
import {addFavList, removeFromFavList, updateFavList} from '../../Redux/slice/FavListSlice';

const FilterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [likedIds, setLikedIds] = useState([]);
  const [isSearchBarFocused, setSearchBarFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const selectedData = useSelector(state => state?.Filters?.filter);
  const favoriteData = useSelector(state => state?.Favorites?.favList);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const favListUpdates = () => {
    retrieveArtIds(val => {
      setLikedIds(val);
      dispatch(updateFavList(val));
    });
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  const updateList = result => {
    const updatedArr = result.map(item => ({
      ...item,
      likeFlag: favoriteData.includes(item?.objectNumber),
    }));
    return updatedArr;
  };

  const fetchDataFromApi = async () => {
    setLoading(true);
    try {
      const result = await getAllCollections({
        p: page,
        q: searchQuery,
        ...selectedData,
      });
      setLoading(false);
      if (page > 1) {
        setData(prevVal => [...prevVal, ...updateList(result)]);
      } else {
        setData(updateList(result));
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Something went wrong');
    }
  };

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
    favListUpdates();
    fetchDataFromApi();
  }, [page]);

  const debouncedSearch = _debounce(async searchQur => {
    try {
      setLoading(true);
      if (searchQur.length > 3 || searchQur.length === 0) {
        if (page === 1) {
          fetchDataFromApi();
        } else {
          setPage(1);
        }
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const loadMoreData = () => {
    if (!loading) {
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
      if (page > 1) {
        setPage(1);
      } else {
        fetchDataFromApi();
      }
      // setPage(1);
    }, []),
  );

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
            <TouchableOpacity onPress={() => toggleModal()}>
              {Platform.OS === 'ios' ? (
                <Image source={FilterIcon} style={{...styles.img}} />
              ) : (
                <Icon name="filter" size={32} color="#000" />
              )}
            </TouchableOpacity>
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
              ListFooterComponent={() => <FlatListLoader loading={loading} />}
              ListEmptyComponent={
                <View style={{...styles.emptyTxt}}>
                  <Text>No data available</Text>
                </View>
              }
            />
          </View>
          <FilterModal
            toggleModal={() => toggleModal()}
            isModalVisible={isModalVisible}
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
