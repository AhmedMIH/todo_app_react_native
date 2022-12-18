import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import colors from './colors';
import constants from './constants';
import TaskIcon from './TaskIcon';
import {getIconBgColor, getIconBgColorOpacity, geticonUrl} from './commonFunction';
import Button from './button';

const TasksListItem = ({
  item,
  onPress,
  onDeleteButtonPress,
  onEditButtonPress,
}) => {
  const [modalVisiable, setModalVisiable] = useState(false);
  const [taskState, setTaskState] = useState(item.state);
  const fields = [];
  for (let i = 1; i <= constants.statusName.length; i++) {
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
          {constants.statusName[i - 1]}
        </Text>
      </TouchableOpacity>,
    );
  }
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{
        justifyContent: 'center',
        padding: 8,
        paddingVertical: 12,
        borderColor: colors.gary,
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 8,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TaskIcon
          iconUri={geticonUrl(item.state * 1)}
          bgColor={getIconBgColor(item.state * 1)}
          size={50}
        />
        <View style={{flex: 1, justifyContent: 'center', marginStart: 8}}>
          <Text style={{fontWeight: '600', fontSize: 15, color: 'black'}}>
            {item.todoName}
          </Text>
          <Text style={{fontWeight: '600', fontSize: 13}}>{item.todoDate}</Text>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'center', height: 20, width: 20}}
          onPress={() => {
            setModalVisiable(true);
          }}>
          <Image
            source={require('../assets/icons/3dots.png')}
            style={{alignSelf: 'center', height: 20, width: 20, marginEnd: 16}}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiable}
        onRequestClose={() => {
          setModalVisiable(false);
        }}>
        <Pressable
          onPress={event => {
            if (event.target == event.currentTarget) {
              setModalVisiable(false);
              onEditButtonPress(taskState);
            }
          }}
          style={styles.outsideModal}>
          <View style={styles.modal}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 18,
                fontWeight: '700',
              }}>
              Change status
            </Text>
            <ScrollView
              style={{margin: 16, alignSelf: 'center'}}
              showsHorizontalScrollIndicator={false}
              horizontal>
              {fields}
            </ScrollView>

            <Button
              title={'Delete Task'}
              textColor={'#ff8a8a'}
              styleProps={{backgroundColor: '#fdefef'}}
              onPress={() => {
                onDeleteButtonPress();
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </TouchableOpacity>
  );
};

export default TasksListItem;

const styles = StyleSheet.create({
  outsideModal: {
    backgroundColor: 'rgba(1, 1, 1, 0.1)',
    flex: 1,
  },
  modal: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: '30%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 32,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
});
