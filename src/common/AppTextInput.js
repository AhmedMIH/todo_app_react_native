import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import colors from './colors';

const AppTextInput = ({icon, width = '100%', ...otherProps}) => {
  return (
    <View style={[styles.container, {width}]}>
      {icon && <Image source={icon} style={styles.icon} />}
      <TextInput style={{fontSize: 18, color: 'black'}} {...otherProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
});

export default AppTextInput;
