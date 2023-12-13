import {ActivityIndicator} from 'react-native';
import React from 'react';

const FlatListLoader = ({loading}) => {
  return <ActivityIndicator animating={loading} size="large" />;
};

export default FlatListLoader;

