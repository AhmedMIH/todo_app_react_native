import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import RNRestart from 'react-native-restart';

import React, {useRef, useState} from 'react';
import BaseScreen from '../../common/BaseScreen';
import colors from '../../common/colors';
import Button from '../../common/button';
import {removeAllItem} from '../../common/commonFunction';
import constants from '../../common/constants';

const ProfileScreen = ({navigation}) => {
  const [modalVisiable, setModalVisiable] = useState(false);
  return (
    <BaseScreen>
      <Text style={{fontSize: 32, fontWeight: 'bold', color: 'black'}}>
        Profile
      </Text>
      <Image
        source={require('../../assets/icons/avater.png')}
        style={{marginTop: 30, height: 150, width: 150, alignSelf: 'center'}}
      />
      <Text
        style={{
          textAlign: 'center',
          marginTop: 32,
          fontWeight: '800',
          fontSize: 20,
          color: 'black',
        }}>
        ahmed moahmed
      </Text>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 8,
          fontWeight: '400',
          fontSize: 18,
          color: 'black',
        }}>
        m_rx_22@yahoo.com
      </Text>
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate(constants.ChangePasswordScreen)
      }}
        style={{
          marginTop: 50,
          borderWidth: 1,
          borderColor: colors.lightGray,
          paddingVertical: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          borderRadius: 15,
        }}>
        <Image
          source={require('../../assets/icons/changePassword.png')}
          style={{height: 30, width: 30, alignSelf: 'center'}}
        />
        <Text
          style={{
            marginStart: 16,
            alignSelf: 'center',
            fontSize: 18,
            color: 'black',
            fontWeight: '700',
            flex: 1,
          }}>
          Change password
        </Text>
        <Image
          source={require('../../assets/icons/rightArrow.png')}
          style={{height: 20, width: 20, alignSelf: 'center'}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setModalVisiable(true);
        }}
        style={{
          marginTop: 24,
          borderWidth: 1,
          borderColor: colors.lightGray,
          paddingVertical: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          borderRadius: 15,
        }}>
        <Image
          source={require('../../assets/icons/log-out.png')}
          style={{height: 30, width: 30, alignSelf: 'center'}}
        />
        <Text
          style={{
            marginStart: 16,
            alignSelf: 'center',
            fontSize: 18,
            color: 'black',
            fontWeight: '700',
            flex: 1,
          }}>
          Log out
        </Text>
        <Image
          source={require('../../assets/icons/rightArrow.png')}
          style={{height: 20, width: 20, alignSelf: 'center'}}
        />
      </TouchableOpacity>
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
              Log out
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontWeight: '400',
                marginHorizontal: 16,
                marginTop: 8,
              }}>
              Are you sure you want to log out of your account?
            </Text>
            <Button
              title={'Logout'}
              textColor={'#ff8a8a'}
              styleProps={{backgroundColor: '#fdefef', marginTop: 16}}
              onPress={async () => {
                await removeAllItem();
                RNRestart.Restart();
              }}
            />
            <Button
              title={'cancel'}
              textColor={'black'}
              styleProps={{
                backgroundColor: colors.SecondMain,
                marginTop: 16,
                padding: 12,
              }}
              onPress={() => {
                setModalVisiable(false);
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </BaseScreen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  outsideModal: {
    backgroundColor: 'rgba(1, 1, 1, 0.1)',
    flex: 1,
  },
  modal: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: '32%',
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
