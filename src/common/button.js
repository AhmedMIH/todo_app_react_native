import {Image, Text, TouchableOpacity} from 'react-native';
import colors from './colors';

const Button = ({title, onPress,iconUri,styleProps,textColor}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 16,
        width: '90%',
        backgroundColor: colors.MainTheme,
        justifyContent: 'center',
        borderRadius:15
      },styleProps]}>
      {iconUri ? <Image style={{alignSelf:'center',height:20,width:20}} source={iconUri}/>: null}
      <Text style={{fontSize:18,color:textColor?textColor:'white',fontWeight:'700'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
