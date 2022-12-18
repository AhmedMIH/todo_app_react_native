import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import BaseScreen from '../../common/BaseScreen';
import Button from '../../common/button';
import {connect} from 'react-redux';
import {changePassword} from '../../actions';
import Spinner from 'react-native-loading-spinner-overlay';

const ChangePasswordScreen = ({changePassword, errorMessage, loading}) => {
  const [newPass, setNewPass] = useState(null);
  const [oldPass, setOldPass] = useState(null);

  return (
    <BaseScreen>
      <Spinner visible={loading} />
      <Text style={{fontSize: 32, fontWeight: 'bold', color: 'black'}}>
        Change password
      </Text>
      <Text style={{marginStart: 8, marginTop: 50}}>old password</Text>
      <TextInput
        secureTextEntry={true}
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
          setOldPass(value);
        }}
        value={oldPass}
      />
      <Text style={{marginStart: 8, marginTop: 16}}>new password</Text>
      <TextInput
        secureTextEntry={true}
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
          setNewPass(value);
        }}
        value={newPass}
      />

      {errorMessage && (
        <Text style={{color: 'red', marginTop: 16}}>{errorMessage}</Text>
      )}

      <Button
        styleProps={{padding: 20, marginTop: 32, width: '100%'}}
        title={'change'}
        onPress={() => {
          changePassword(oldPass, newPass);
        }}
      />
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
  changePassword,
})(ChangePasswordScreen);
