import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setFilter} from '../../Redux/slice/FilterSlice';
import {Makers} from '../../assets/Constants';
import FilterBtn from '../Buttons/FilterBtn';

const FilterModal = ({isModalVisible, toggleModal, selectedData}) => {
  const dispatch = useDispatch();
  const [maker, setMakerValue] = React.useState(selectedData?.involvedMaker);

  const saveFilter = () => {
    dispatch(setFilter({involvedMaker: maker}));
    toggleModal();
  };

  const clearFilter = () => {
    setMakerValue('');
    dispatch(setFilter({involvedMaker: ''}));
    toggleModal();
  };

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
              onValueChange={newValue => {
                console.log(newValue, 'newValue');
                setMakerValue(newValue);
              }}
              value={maker}>
              {Makers.map((option, index) => (
                <View key={index} style={{...styles.radioBtnView}}>
                  <RadioButton
                    value={option}
                    status={maker === option ? 'checked' : 'unchecked'}
                  />
                  <Text>{option}</Text>
                </View>
              ))}
            </RadioButton.Group>
            <View style={{...styles.modalBtnContainer}}>
              <FilterBtn title="save filter" onClick={saveFilter} />
              <FilterBtn title="Clear filters" onClick={clearFilter} />
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
