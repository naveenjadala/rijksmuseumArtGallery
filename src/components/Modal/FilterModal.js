import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setFilter} from '../../Redux/slice/FilterSlice';
import {Makers} from '../../assets/Constants';

const FilterModal = ({isModalVisible, toggleModal}) => {
  const dispatch = useDispatch();
  const [maker, setMakerValue] = React.useState('');
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{...styles.filterTitle}}>Filters</Text>
            <Text style={{...styles.filterSubTitle}}>InvolvedMaker:</Text>
            <RadioButton.Group
              onValueChange={newValue => setMakerValue(newValue)}
              value={maker}>
              {Makers.map((option, index) => (
                <View key={index} style={{...styles.radioBtnView}}>
                  <RadioButton value={option} />
                  <Text>{option}</Text>
                </View>
              ))}
            </RadioButton.Group>
            <View style={{...styles.modalBtnContainer}}>
              <Button
                title="save Modal"
                onPress={() => {
                  dispatch(setFilter({involvedMaker: maker}));
                  toggleModal();
                }}
              />
              <Button
                title="Clear Filters"
                onPress={() => {
                  setMakerValue('');
                  dispatch(setFilter({involvedMaker: ''}));
                  toggleModal();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  filterTitle: {
    margin: 20,
    fontSize: 18,
    color: '#000',
  },
  filterSubTitle: {
    marginHorizontal: 20,
    fontSize: 16,
    color: '#000',
  },
  radioBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
