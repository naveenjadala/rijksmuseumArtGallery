import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FilterIcon from '../assets/Images/filter.png';

const FilterIconComponent = ({toggleModal, selectedData}) => {
  return (
    <TouchableOpacity onPress={() => toggleModal()}>
      {selectedData?.involvedMaker !== '' && (
        <View style={{...styles.filterActiveSty}} />
      )}
      {Platform.OS === 'ios' ? (
        <Image source={FilterIcon} style={{...styles.img}} />
      ) : (
        <Icon name="filter" size={32} color="#000" />
      )}
    </TouchableOpacity>
  );
};

export default FilterIconComponent;

const styles = StyleSheet.create({
  filterActiveSty: {
    backgroundColor: 'green',
    borderRadius: 50,
    height: 12,
    width: 12,
    position: 'absolute',
    right: 0,
    top: 3,
    zIndex: 1,
  },
});
