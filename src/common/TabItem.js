import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const TabItem = ({title, index, onPress, selected}) => {
  return (
    <TouchableOpacity
      style={{
        margin: 16,
        marginLeft: 0,
        marginRight: 8,
        backgroundColor: selected == index ? 'black' : 'white',
        justifyContent: 'center',
        borderRadius: 15,
      }}
      onPress={() => {
        onPress();
      }}>
      <Text
        style={{
          color: selected == index ? 'white' : 'black',
          marginHorizontal: 16,
          fontWeight: '500',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;
