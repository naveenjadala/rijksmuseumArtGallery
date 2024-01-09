import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const FilterBtn = ({title, onClick}) => {
  return <Button title={title} onPress={onClick} />;
};

export default FilterBtn;

const styles = StyleSheet.create({});
