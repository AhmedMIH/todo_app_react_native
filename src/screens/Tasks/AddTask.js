import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import BaseScreen from '../../common/BaseScreen';
import Button from '../../common/button';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '../../common/commonFunction';
import {connect} from 'react-redux';
import {addTask} from '../../actions';
import Spinner from 'react-native-loading-spinner-overlay';

const AddTask = ({navigation, addTask,loading}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState(null);
  const [taskDesc, setTaskDesc] = useState(null);
  const [taskDate, setTaskDate] = useState(null);

  return (
    <BaseScreen>
    <Spinner visible={loading}/>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../../assets/icons/back.png')}
          style={{height: 15, width: 10}}
        />
      </TouchableOpacity>
      <ScrollView style={{flex: 1, backgroundColor: 'white', height: '100%'}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: 'black',
            marginTop: 16,
          }}>
          New Task
        </Text>
        <Text style={{marginStart: 8, marginTop: 16}}>Name</Text>
        <TextInput
          textAlignVertical="top"
          multiline
          style={{
            marginTop: 8,
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1,
            padding: 12,
            fontSize: 14,
            fontWeight: '500',
            paddingVertical: 16,
            borderRadius: 15,
          }}
          onChangeText={value => {
            setTaskName(value);
          }}
          value={taskName}
        />
        <Text style={{marginStart: 8, marginTop: 16}}>Description</Text>
        <TextInput
          textAlignVertical="top"
          multiline
          style={{
            marginTop: 8,
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1,
            padding: 12,
            fontSize: 14,
            fontWeight: '500',
            paddingVertical: 16,
            borderRadius: 15,
            height: 170,
          }}
          onChangeText={value => {
            setTaskDesc(value);
          }}
          value={taskDesc}
        />
        <Text style={{marginStart: 8, marginTop: 16}}>Date</Text>
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
          style={{
            marginTop: 8,
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1,
            padding: 24,
            fontSize: 14,
            fontWeight: '500',
            paddingVertical: 16,
            borderRadius: 15,
          }}>
          <Text>{formatDate(date)}</Text>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setDate(date);
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </TouchableOpacity>
      </ScrollView>

      <Button
        title={'Add Task'}
        styleProps={{
          marginTop: 16,
          marginBottom: 16,
        }}
        onPress={() => {
          addTask(
            {name: taskName, desc: taskDesc, date:formatDate(date) , state: '1'},
            navigation,
          );
        }}
      />
    </BaseScreen>
  );
};

const mapStateToProps = ({task}) => {
  const {loading, errorMessage} = task;
  return {
    loading,
    errorMessage,
  };
};

export default connect(mapStateToProps, {
  addTask,
})(AddTask);

const styles = StyleSheet.create({});
