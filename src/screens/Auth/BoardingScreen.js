import {StatusBar, StyleSheet, Text, View,Image} from 'react-native';
import React from 'react';
import colors from '../../common/colors';
import Button from '../../common/button';
import constants from '../../common/constants';

const BoardingScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          marginTop: 50,
          alignSelf: 'center',
          height: 315,
          width: 315,
          borderRadius: 150,
          borderColor: colors.MainTheme,
          borderWidth: 1,
          justifyContent:'center'
        }}
      >
          <Image
          source={require('../../assets/icons/done-blue.png')}
          style={{height: 100, width: 100, alignSelf: 'center'}}
        />
      </View>
      <Text
        style={{
          marginTop: 32,
          textAlign: 'center',
          marginHorizontal: 24,
          fontSize: 40,
          color:'black',
          fontWeight:'800'
        }}>
        {`A convenient\nand productive\ntask manager`}
      </Text>
      <Text
        style={{
          marginTop: 26,
          textAlign: 'center',
          marginHorizontal: 24,
          fontSize: 20,
        }}>{`My task is a simple application \n for organizing your tasks`}</Text>
      <Button
        title="Start"
        styleProps={{marginTop: 50}}
        onPress={() => {
          navigation.navigate(constants.LoginScreen);
        }}
      />
    </View>
  );
};

export default BoardingScreen;

const styles = StyleSheet.create({});
