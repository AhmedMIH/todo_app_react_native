import {View, Text, Animated, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../common/colors';
import {getToken} from '../common/commonFunction';
import constants from '../common/constants';

const SplashScreen = ({navigation}) => {
  const value = useState(new Animated.Value(-100))[0];
  const opacity = useState(new Animated.Value(0))[0];

  const move = () => {
    Animated.timing(value, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    move();
    const selectTarget = async () => {
      const token = await getToken();
      let target;
      if (token) {
        target = constants.HomeScreen;
      } else {
        target = constants.AuthScreen;
      }
      setTimeout(() => {
        navigation.navigate(target);
      }, 1500);
    };
    selectTarget()    
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.SecondMain,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Animated.View style={{right: value}}>
        <Image
          style={{height: 100, width: 100}}
          source={require('../assets/icons/done-blue.png')}
        />
      </Animated.View>
      <Animated.View style={{opacity: opacity}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color: 'black',
          }}>
          To Do
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
