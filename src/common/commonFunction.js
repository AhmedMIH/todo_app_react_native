import {AsyncStorage} from 'react-native';
import colors from './colors';
import constants from './constants';
import moment from 'moment';
export const geticonUrl = iconIndex => {
  switch (iconIndex) {
    case 1:
      return require('../assets/icons/toDo.png');
    case 2:
      return require('../assets/icons/inProgress.png');
    case 3:
      return require('../assets/icons/testing.png');
    case 4:
      return require('../assets/icons/done.png');
    default:
      return require('../assets/icons/toDo.png');
  }
};
export const getIconBgColor = iconIndex => {
  switch (iconIndex) {
    case 1:
      return colors.todoIconColor;
    case 2:
      return colors.inProgressIconColor;
    case 3:
      return colors.testingIconColor;
    case 4:
      return colors.DoneIconColor;
    default:
      return colors.todoIconColor;
  }
};

export const getIconBgColorOpacity = iconIndex => {
  switch (iconIndex) {
    case 1:
      return colors.todoIconColorOpacity;
    case 2:
      return colors.inProgressIconColorOpacity
    case 3:
      return colors.testingIconColorOpacity;
    case 4:
      return colors.DoneIconColorOpacity;
    default:
      return colors.todoIconColorOpacity;
  }
};


export const getToken = async () => {
  const token = await AsyncStorage.getItem(constants.TOKEN_KEY);
  return token;
};

export const removeAllItem = async () => {
  await AsyncStorage.clear();
};

export const formatDate = date => {
  const newDate = moment(date).format('MMMM Do YYYY');
  const yesterday = moment().subtract(1, 'days').calendar()
  const tommorow = moment().add(1, 'days').calendar()
  const today = moment().format('MMMM Do YYYY')

  let formatedDate;
  if (newDate == today ) {
    formatedDate = 'Today';
  } else if (
    moment(date).subtract(0,'days').calendar() 
    ==
    yesterday
  ) {
    formatedDate = 'Yesterday';
  } else if ( moment(date).subtract(0,'days').calendar()  == tommorow){
    formatedDate = 'Tommorow'
  } 
  else {
    formatedDate = newDate;
  }
  return formatedDate;
};
