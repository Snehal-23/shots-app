//389330709559
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Dimensions,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import Post from '../../components/Post';
import Video, {LoadError} from 'react-native-video';
// import posts from '../../data/Posts';
import {API, graphqlOperation} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';
import {Auth} from 'aws-amplify';

const Home = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    const fetchpost = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listPosts));
        setPosts(response.data.listPosts.items);
        // console.log(JSON.stringify(response.data.listPosts.items));
        // alert(JSON.stringify(response.data.listPosts.items.song));
        // alert('success');
      } catch (e) {
        console.log(JSON.stringify(e));
        alert('error');
      }
    };
    fetchpost();
  }, []);
  const signOut = async () => {
    try {
      await Auth.signOut({global: true});
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
  return (
    <View>
      {/* <TouchableOpacity
        style={{backgroundColor: 'gold', padding: 8}}
        onPress={signOut}>
        <Text>Logout</Text>
      </TouchableOpacity> */}
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
    </View>
  );
};

export default Home;
