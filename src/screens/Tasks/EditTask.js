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
import React, {useEffect, useState} from 'react';
import BaseScreen from '../../common/BaseScreen';
import Button from '../../common/button';
import DatePicker from 'react-native-date-picker';
import {
  formatDate,
  getIconBgColor,
  getIconBgColorOpacity,
  geticonUrl,
} from '../../common/commonFunction';
import TaskIcon from '../../common/TaskIcon';
import {editTask,deleteTask} from '../../actions';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const EditTask = ({navigation, route, editTask,deleteTask,loading}) => {
  const height = Dimensions.get('screen').height;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState(null);
  const [taskDesc, setTaskDesc] = useState(null);
  const [taskDate, setTaskDate] = useState(null);
  const [taskState, setTaskState] = useState(null);

  const item = route.params.item;

  const fields = [];
  const statusName = ['To do', 'In progress', 'Testing', 'Done'];
  for (let i = 1; i <= statusName.length; i++) {
    fields.push(
      <TouchableOpacity
        onPress={() => {
          setTaskState(i);
        }}
        key={i}
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          borderRadius: 15,
          marginHorizontal: 6,
          backgroundColor: taskState == i ? getIconBgColorOpacity(i) : null,
          padding: 8,
        }}>
        <TaskIcon
          iconUri={geticonUrl(i)}
          bgColor={getIconBgColor(i)}
          size={50}
        />
        <Text
          style={{
            marginTop: 8,
            textAlign: 'center',
            color: getIconBgColor(i),
            fontWeight: '500',
          }}>
          {statusName[i - 1]}
        </Text>
      </TouchableOpacity>,
    );
  }

  useEffect(() => {
    if (item) {
      setTaskName(item.todoName);
      setTaskDesc(item.todoDes);
      setTaskDate(item.todoDate);
      setTaskState(item.state);
    }
  }, [item]);
  return (
    <BaseScreen>
    <Spinner visible={loading} />
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: 'black',
              marginTop: 16,
            }}>
            Task
          </Text>
          <TouchableOpacity onPress={() => {
            deleteTask(item._id,navigation)
          }}>
            <Image
              style={{
                marginTop: 16,
                width: 30,
                height: 30,
                alignSelf: 'center',
              }}
              source={require('../../assets/icons/delete.png')}
            />
          </TouchableOpacity>
        </View>
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
          <Text>{taskDate}</Text>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setDate(date);
              setTaskDate(formatDate(date));
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </TouchableOpacity>
        <Text style={{marginStart: 8, marginTop: 16}}>State</Text>
        <ScrollView
          style={{margin: 16, alignSelf: 'center'}}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {fields}
        </ScrollView>
      </ScrollView>

      <Button
        title={'Save changes'}
        styleProps={{
          marginTop: 16,
          marginBottom: 16,
        }}
        onPress={()=>{
          editTask({name:taskName,desc:taskDesc,date:taskDate,state:taskState},navigation ,item._id)
        }}
      />
    </BaseScreen>
  );
};

const mapStateToProps = ({task}) => {
  const {loading, errorMessage, tasks} = task;
  return {
    loading,
    errorMessage,
    tasks,
  };
};

export default connect(mapStateToProps, {
  editTask,
  deleteTask
})(EditTask);

const styles = StyleSheet.create({});
