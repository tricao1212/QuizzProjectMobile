import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import LeaderBoard from '../Screens/LeaderBoard';
import Category from '../Screens/Category';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNav = ({navigation}) => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Icon name="home" size={26} />,
          tabBarAnimationType: 'flip',
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{tabBarIcon: () => <Icon name="file-question" size={26} />}}
      />
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoard}
        options={{
          tabBarLabel: 'Rank',
          tabBarIcon: () => <Icon name="human-queue" size={26} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{tabBarIcon: () => <Icon name="account" size={26} />}}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
