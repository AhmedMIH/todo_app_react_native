import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../../common/button';
import BaseScreen from '../../common/BaseScreen';
import {sumbitLogin} from '../../actions';
import {connect} from 'react-redux';
import colors from '../../common/colors';
import constants from '../../common/constants';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = ({navigation, sumbitLogin, errorMessage, loading}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(()=>{
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  })
  const login = async () => {
    await sumbitLogin(navigation, email, password);
  };

  return (
    <BaseScreen>
      <Spinner visible={loading} />
      <Text style={{fontSize: 32, fontWeight: 'bold', color: 'black'}}>
        Login
      </Text>
      <TextInput
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
        placeholder="Email"
        style={{
          marginTop: 16,
          height: 65,
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 10,
          borderColor: colors.lightGray,
          borderWidth: 1,
        }}
      />
      <TextInput
        placeholder="password"
        style={{
          marginTop: 12,
          height: 65,
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 10,
          borderColor: colors.lightGray,
          borderWidth: 1,
        }}
        value={password}
        onChangeText={value => {
          setPassword(value);
        }}
        secureTextEntry={true}
      />

      {errorMessage && (
        <Text style={{color: 'red', marginTop: 16}}>{errorMessage}</Text>
      )}
      <Button
        styleProps={{padding: 20, marginTop: 24, width: '100%'}}
        title={'Login'}
        onPress={() => {
          login();
        }}
      />
      {!keyboardStatus && 
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          marginBottom: 24,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.lightGray,
              height: 1,
              alignSelf: 'center',
              marginRight: 8,
            }}
          />
          <Text>OR</Text>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.lightGray,
              height: 1,
              alignSelf: 'center',
              marginLeft: 8,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.SecondMain,
            borderRadius: 10,
            padding: 24,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Image
            source={require('../../assets/icons/google.png')}
            style={{height: 30, width: 30, alignSelf: 'center'}}
          />
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              marginStart: 50,
              fontWeight: '600',
              textAlignVertical: 'center',
            }}>
            Continue with Google
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 16,
          }}>
          <Text style={{textAlign: 'center', color: 'black'}}>
            No account ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(constants.RegisterScreen);
            }}>
            <Text style={{textAlign: 'center', color: colors.MainTheme}}>
              {' '}
              Create one
            </Text>
          </TouchableOpacity>
        </View>
      </View>}
    </BaseScreen>
  );
};

const mapStateToProps = ({auth}) => {
  const {loading, errorMessage} = auth;
  return {
    loading,
    errorMessage,
  };
};

export default connect(mapStateToProps, {
  sumbitLogin,
})(LoginScreen);
