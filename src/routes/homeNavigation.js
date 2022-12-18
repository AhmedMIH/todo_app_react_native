import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Tasks/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import {Image} from 'react-native';
import colors from '../common/colors';
const HomeTabNav = createBottomTabNavigator();

const HomeTab = () => (
  <HomeTabNav.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused}) => {
        let iconName;
        if (route.name === 'Tasks') {
          iconName = require('../assets/icons/tasks.png');
        } else if (route.name === 'Profile') {
          iconName = require('../assets/icons/profile.png');
        }
        return (
          <Image
            source={iconName}
            style={{height: 20, width: 20, alignSelf: 'center'}}
          />
        );
      },
      tabBarActiveTintColor: colors.MainTheme,
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle:{fontSize:14},
    })}>
    <HomeTabNav.Screen name="Tasks" component={HomeScreen} />
    <HomeTabNav.Screen name="Profile" component={ProfileScreen} />
  </HomeTabNav.Navigator>
);

export default HomeTab;
