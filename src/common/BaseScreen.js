import { SafeAreaView,StatusBar, View } from 'react-native'
import React from 'react'

const height = StatusBar.currentHeight
const BaseScreen = ({children}) => {
  return (
    <SafeAreaView style={{backgroundColor:'white',paddingTop:height,flex:1,width:'100%',height:"100%"}}>
      <View style={{flex:1,marginHorizontal:16}}>
      {children}
      </View>
    </SafeAreaView>
  )
}

export default BaseScreen