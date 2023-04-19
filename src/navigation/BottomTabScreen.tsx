import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, UserProfileScreen} from '../views';

const MainStack = createBottomTabNavigator();

export const BottomTabScreen = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="UserProfile" component={UserProfileScreen} />
    </MainStack.Navigator>
  );
};
