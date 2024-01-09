import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Title = ({title}) => {
  return <Text style={{...styles.txtSty}}>{title}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  txtSty: {
    fontSize: 16,
    color: '#000',
  },
});
