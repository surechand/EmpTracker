import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {LoginScreen, RegistrationScreen} from '../views';
import {BottomTabScreen} from './BottomTabScreen';

const RootStack = createStackNavigator();

export const RootStackScreen = () => {
  const theme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {user ? (
          <RootStack.Screen name="Home" options={{headerShown: false}}>
            {props => <BottomTabScreen {...props} extraData={user} />}
          </RootStack.Screen>
        ) : (
          <>
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerTitleAlign: 'center'}}
            />
            <RootStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{headerTitleAlign: 'center'}}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
