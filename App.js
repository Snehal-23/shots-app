/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createUser} from './src/graphql/mutations';
import {getUser} from './src/graphql/queries';
import {withAuthenticator} from 'aws-amplify-react-native';
import Navigation from './src/navigation';
import {Auth, API, graphqlOperation} from 'aws-amplify';
const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
];

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    const fetchUser = async () => {
      // get currently authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      if (!userInfo) {
        return;
      }

      // check if THE user exist in database
      const getUserResponse = await API.graphql(
        graphqlOperation(getUser, {id: userInfo.attributes.sub}),
      );

      if (getUserResponse.data.getUser) {
        console.log('User already exists in database');
        return;
      }

      // if it doesn't (it's newly registered user)
      // then, create a new user in database
      const newUser = {
        id: userInfo.attributes.sub,
        user_name: userInfo.username,
        user_email: userInfo.attributes.email,
        user_profile: getRandomImage(),
        user_phone: userInfo.attributes.phone_number,
        user_fn: 'f',
        user_ln: 'l',
        user_bio: '',
      };
      // alert(JSON.stringify(newUser));
      await API.graphql(graphqlOperation(createUser, {input: newUser}));
    };

    fetchUser();
  }, []);
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'black',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default withAuthenticator(App);
