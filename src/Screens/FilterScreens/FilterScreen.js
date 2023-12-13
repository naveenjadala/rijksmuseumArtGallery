import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import FlatListLoader from '../../components/Loaders/FlatListLoader';
import ArtCard from '../../components/Card/ArtCard';
import Icon from 'react-native-vector-icons/Ionicons';
import FilterModal from '../../components/Modal/FilterModal';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {storeArtData} from '../../DataBase/storeArtData';
import {retrieveArtIds} from '../../DataBase/retrieveData';
import { getAllCollections } from '../../Services/services';

const FilterScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [likedIds, setLikedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const selectedData = useSelector(state => state?.Filters?.filter);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onChangeSearch = query => setSearchQuery(query);

  const fetchDataFromApi = async from => {
    try {
      const result = await getAllCollections({p: page, q: searchQuery});
      setLoading(false);
      const updatedArr = result.map(item => ({
        ...item,
        likeFlag: likedIds.includes(item?.objectNumber),
      }));
      setData(prevVal => [...prevVal, ...updatedArr]);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchSearchDataFromApi = async (params = {}) => {
    try {
      const result = await getAllCollections({p: 0, q: searchQuery, ...params});
      setLoading(false);
      const updatedArr = result.map(item => ({
        ...item,
        likeFlag: likedIds.includes(item?.objectNumber),
      }));
      setData(updatedArr);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 3) {
      fetchSearchDataFromApi();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (Object.entries(selectedData).length > 0) {
      fetchSearchDataFromApi(selectedData);
    }
  }, [selectedData]);

  useEffect(() => {
    // retrieveArtIds(val => {
    //   setLikedIds(val);
    // });
    fetchDataFromApi('page');
  }, [page]);

  const loadMoreData = () => {
    if (!loading) {
      setPage(page + 1);
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
    storeArtData(detailsId?.objectNumber, updatedArr[index]);
  };

  const redirectToDetails = (detailsId, index) => {
    navigation.navigate('Details', {detailsId});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onTouchCancel={() => setPage(0)}
            onClearIconPress={() => setPage(0)}
            style={{width: '80%', margin: 20, backgroundColor: 'white'}}
          />
          <TouchableOpacity onPress={() => toggleModal()}>
            <Icon name="filter" size={32} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={{margin: 15, height: '85%'}}>
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
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
            // eslint-disable-next-line react/no-unstable-nested-components
            ListFooterComponent={() => <FlatListLoader loading={loading} />}
          />
        </View>
        <FilterModal
          toggleModal={() => toggleModal()}
          isModalVisible={isModalVisible}
        />
      </>
    </SafeAreaView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({});
