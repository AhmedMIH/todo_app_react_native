import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './authNavigation';
import HomeTab from './homeNavigation';
import AddTask from '../screens/Tasks/AddTask';
import SplashScreen from '../screens/SplashScreen';
import EditTask from '../screens/Tasks/EditTask';
import ChangePasswordScreen from '../screens/Profile/ChangePasswordScreen';

const Mainstack = createNativeStackNavigator();
const MainRouter = () => {
  return (
    <Mainstack.Navigator screenOptions={{headerShown: false}}>
      <Mainstack.Screen name="Splash" component={SplashScreen} />
      <Mainstack.Screen name="Auth" component={AuthStack} />
      <Mainstack.Screen name="Main" component={HomeTab} />
      <Mainstack.Screen name="AddTask" component={AddTask} />
      <Mainstack.Screen name="EditTask" component={EditTask} />
      <Mainstack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
    </Mainstack.Navigator>
  );
};

export default MainRouter;
