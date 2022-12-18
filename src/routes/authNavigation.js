import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/Auth/LoginScreen"
import SignUpScreen from "../screens/Auth/SignUpScreen"
import BoardingScreen from "../screens/Auth/BoardingScreen"

const AuthStackNav = createNativeStackNavigator()

const AuthStack  = ()=>{
    return (
        <AuthStackNav.Navigator screenOptions={{headerShown:false}}>
            <AuthStackNav.Screen name="Boadring" component={BoardingScreen}/>
            <AuthStackNav.Screen name="Login" component={LoginScreen}/>
            <AuthStackNav.Screen name="SignUp" component={SignUpScreen}/>
        </AuthStackNav.Navigator>
    )
}

export default AuthStack