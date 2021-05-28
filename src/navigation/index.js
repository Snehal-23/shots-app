import * as React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './tabNav';
import Camera from '../screens/Camera';
import CreatePost from '../screens/CreatePost';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            headerShown: true,
            title: 'Post',
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
