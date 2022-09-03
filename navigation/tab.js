import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View,Image,Text } from 'react-native';
import imageScreen from '../screens/ImageScreen';
import MusicScreen from '../screens/MusicScreen';
import OtherScreen from '../screens/OtherScreen';
const Tab = createBottomTabNavigator();
const Tabs =() =>{
    return(
        <Tab.Navigator  initialRouteName="Home"
        activeColor="#fff">

        <Tab.Screen name="Home" component={imageScreen} options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}/>
                
        <Tab.Screen name="Azaan" component={MusicScreen} options={{
          tabBarLabel: 'Azaan',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="musical-notes-outline" color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name="Qibla" component={OtherScreen} options={{
          tabBarLabel: 'Azaan',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-sharp" color={color} size={26} />
          ),
        }}/>
      </Tab.Navigator>

    );
}
export default Tabs;