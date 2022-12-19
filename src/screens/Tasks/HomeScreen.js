import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import BaseScreen from '../../common/BaseScreen';
import TabItem from '../../common/TabItem';
import TasksListItem from '../../common/TasksListItem';
import Button from '../../common/button';
import constants from '../../common/constants';
import {getTasks,deleteTask,editTask} from '../../actions';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
const HomeScreen = ({navigation, getTasks,deleteTask,editTask ,loading,tasks}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const isFocused = useIsFocused();
  const changeSelectedTab = index => {
    setSelectedTab(index);
  };
  const tabHeaders = [
    {
      title: 'All',
      index: 0,
    },
    {
      title: 'To do',
      index: 1,
    },
    {
      title: 'In progress',
      index: 2,
    },
    {
      title: 'Testing',
      index: 3,
    },
    {
      title: 'Done',
      index: 4,
    },
  ];

  const filterTasks = state => {
    const filterdList = tasks.filter(task => {
      return task.state == state ;
    });
    return filterdList;
  };

  useEffect(() => {
    isFocused && getTasks();
  }, [isFocused]);

  const refresh= ()=>{
    getTasks()
  }

  return (
    <BaseScreen>
    <Spinner visible={loading}/>
      <Text style={{fontSize: 32, fontWeight: 'bold', color: 'black'}}>
        Tasks
      </Text>
      <ScrollView
        style={{maxHeight: 60}}
        contentContainerStyle={{height: 60}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {tabHeaders.map(item => (
          <TabItem
            key={item.index}
            title={item.title}
            index={item.index}
            selected={selectedTab}
            onPress={() => {
              changeSelectedTab(item.index);
            }}
          />
        ))}
      </ScrollView>
      {selectedTab == 0 ? (
        <FlatList
          numColumns={1}
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TasksListItem
              item={item}
              key={index}
              onPress={() => {
                navigation.navigate(constants.EditTaskScreen, {item: item});
              }}
              onDeleteButtonPress={()=>{
                deleteTask(item._id)
                refresh()
              }}
              onEditButtonPress={(stateNum)=>{
                editTask({name:item.todoName,desc:item.todoDes,date:item.todoDate,state:stateNum},null,item._id)
                refresh()
              }}
            />
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                height:600,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize:20
                }}>{`No Task yet\nClick + to add new task`}</Text>
            </View>
          )}
        />
      ) : (
        <FlatList
          numColumns={1}
          data={filterTasks(selectedTab)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TasksListItem
              item={item}
              key={index}
              onPress={() => {
                navigation.navigate(constants.EditTaskScreen, {item: item});
              }}
              onDeleteButtonPress={()=>{
                deleteTask(item._id)
                refresh()
              }}
              onEditButtonPress={(stateNum)=>{
                editTask({name:item.todoName,desc:item.todoDes,date:item.todoDate,state:stateNum},null,item._id)
                refresh()
              }}
            />
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                height:600,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize:20,
                  textAlign: 'center',
                }}>{`you dont have any ${tabHeaders[selectedTab].title} tasks\nClick + to add new task`}</Text>
            </View>
          )}
        />
      )}
      <Button
        styleProps={{
          width: 60,
          borderRadius: 30,
          height: 60,
          position: 'absolute',
          bottom: 10,
          right: 0,
        }}
        iconUri={require('../../assets/icons/add.png')}
        onPress={() => {
          navigation.navigate(constants.AddTaskScreen);
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
  getTasks,
  deleteTask,
  editTask
})(HomeScreen);

const styles = StyleSheet.create({});
