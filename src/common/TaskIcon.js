import { View, Image } from 'react-native'
import React from 'react'

const TaskIcon = ({iconUri,bgColor,size}) => {
  return (
    <View style={{height:size,width:size,backgroundColor:bgColor,borderRadius:size/2,justifyContent:'center',alignItems:'center'}}>
        <Image   source={iconUri}  style={{height:size/2.5,width:size/2.5}} />
    </View>
  )
}

export default TaskIcon