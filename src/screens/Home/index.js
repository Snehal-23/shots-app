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
import {useFocusEffect} from '@react-navigation/native';
import Video, {LoadError} from 'react-native-video';
import {API, graphqlOperation} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';
import {Auth} from 'aws-amplify';

const Home = () => {
  const [posts, setPosts] = useState();
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
  useEffect(() => {
    fetchpost();
  }, []);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchpost();
  //   }, [posts]),
  // );

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
