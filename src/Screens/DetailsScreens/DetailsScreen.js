import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {getCollection} from '../../Services/services';

const {height} = Dimensions.get('screen');
const DetailsScreen = () => {
  const route = useRoute();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchDataFromApi = async id => {
    try {
      const result = await getCollection(id);
      setData(result?.artObject);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDataFromApi(route?.params?.detailsId);
  }, []);

  const [loading, setLoading] = useState(true);

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {loading && <ActivityIndicator animating={loading} size="large" />}
          {data?.webImage?.url ? (
            <Image
              source={{uri: data?.webImage?.url}}
              style={{height: height / 2.5, width: '100%'}}
              resizeMode="stretch"
              onLoadEnd={handleLoadEnd}
            />
          ) : null}
          <View style={{margin: 20}}>
            <Text>{data?.title}</Text>
            <Text>First Maker: {data?.principalOrFirstMaker}</Text>
            <Text>About :</Text>
            <Text>{data?.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
