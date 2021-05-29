import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import awaitAsyncGenerator from '@babel/runtime/helpers/esm/awaitAsyncGenerator';
import {useNavigation} from '@react-navigation/native';
import Video, {FilterType} from 'react-native-video';
import {Auth, graphqlOperation, API, filter} from 'aws-amplify';
import {useRoute} from '@react-navigation/native';
import {getUser, listPostByUser} from '../../graphql/queries';
const Profile = ({}) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState();
  const [info, setInfo] = useState([]);
  const [postList, setPosts] = useState();
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        setUserId(userInfo.attributes.sub);
        const userid = userInfo.attributes.sub;
      } catch (e) {
        console.error(e.message);
      }
      try {
        const response = await API.graphql(
          graphqlOperation(getUser, {id: userId}),
        );
        setInfo(response.data.getUser);
        // alert(JSON.stringify(response.data.getUser));
      } catch (e) {
        console.error(e.message);
      }
    };
    const getUserPost = async () => {
      try {
        const post_response = await API.graphql(
          graphqlOperation(listPostByUser, {
            filter: {userID: {eq: userId}},
          }),
        );
        setPosts(JSON.stringify(post_response.data.listPosts.items));
        alert(JSON.stringify(post_response.data.listPosts.items));
      } catch (e) {
        console.error(e.message);
      }
    };
    getUserInfo();
    getUserPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Image
              source={{
                uri: info.user_profile,
                height: 150,
                width: 150,
              }}
              style={{borderColor: 'white', borderWidth: 1, borderRadius: 75}}
            />
          </View>
          <View style={{flex: 1}}>
            <Text>
              {info.user_fn} {info.user_ln}
            </Text>
            <Text>@{info.user_name}</Text>
            <Text>{info.user_bio}</Text>
          </View>
        </View>
        <View style={{marginTop: 5, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text>friends</Text>
          </View>
          <View style={{flex: 1}}>
            <Text>posts</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          data={postList}
          columnWrapperStyle={{justifyContent: 'space-between', padding: 2}}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <TouchableWithoutFeedback onPress={() => alert(item.id)}>
                <View
                  style={{
                    width: Dimensions.get('window').width / 2,
                    flex: 0.5,
                    marginBottom: 4,
                    backgroundColor: 'black',
                    marginRight: 8,
                    height: 200,
                    elevation: 10,
                  }}>
                  <Video
                    // source={require('../../assets/big_buck_bunny.mp4')}
                    source={{uri: item.video_url}}
                    style={{
                      height: 200,
                      width: Dimensions.get('window').width / 2 - 12,
                    }}
                    resizeMode={'cover'}
                    onError={(e: LoadError) => console.log(e)}
                    repeat={true}
                    // controls={true}
                    // paused={paused}
                    playInBackground={false}
                    fullscreenAutorotate={true}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Profile;
