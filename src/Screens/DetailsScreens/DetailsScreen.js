import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Title from '../../components/Texts/Title';
import useApi from '../../Hooks/useGetApi';
import endpoints from '../../Services/endpoints';
import {useNavigation} from '@react-navigation/native';
import BackArrow from '../../assets/Images/leftArrow.png';

const {height, width} = Dimensions.get('screen');
const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {data: apiData, loading: apiLoading, error: apiErr, callApi} = useApi();

  useEffect(() => {
    if (apiData) {
      setData(apiData?.artObject);
    }
  }, [apiData]);

  const fetchDataFromApi = async id => {
    callApi(endpoints.GET_ART_API, {}, id);
  };

  useEffect(() => {
    fetchDataFromApi(route?.params?.detailsId);
  }, []);

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <SafeAreaView style={{...styles.container}}>
      {apiLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{...styles.backBtn}}>
            <Image source={BackArrow} style={{...styles.imgSty}} />
            <Text style={{...styles.titleSty}}>Details</Text>
          </TouchableOpacity>
          <ScrollView style={{flex: 1}}>
            <View>
              {data?.webImage?.url ? (
                <Image
                  source={{uri: data?.webImage?.url}}
                  style={{width: width, minHeight: height / 2}}
                  onLoadEnd={handleLoadEnd}
                />
              ) : (
                <View style={{width: width, minHeight: height / 2}}>
                  <ActivityIndicator size="large" color="#000" />
                </View>
              )}
              <View style={{margin: 20}}>
                <Title title={data?.title} />
                <Text>
                  <Title title="First Maker:" /> {data?.principalOrFirstMaker}
                </Text>
                <Title title="About:" />
                <Text>{data?.description}</Text>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  titleSty: {
    fontSize: 18,
    color: 'black',
    position: 'absolute',
    left: '40%',
    right: '40%',
  },
  imgSty: {
    width: 35,
    height: 35,
  },
});
