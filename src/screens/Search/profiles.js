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
import {RNCamera} from 'react-native-camera';
import styles from './styles';
import awaitAsyncGenerator from '@babel/runtime/helpers/esm/awaitAsyncGenerator';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import {Auth, graphqlOperation, API, Storage} from 'aws-amplify';
import {useRoute} from '@react-navigation/native';
import {getUser, listPostByUser, listPosts} from '../../graphql/queries';
const Profiles = ({}) => {
  const navigation = useNavigation();
  const [info, setInfo] = useState([]);
  const [postList, setPostList] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [data, setData] = useState([]);
  const route = useRoute();
  const [userId, setUserId] = useState(route.params.user_id);
  useEffect(() => {
    const getUserInfo = async () => {
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
      let list = [];

      try {
        const post_response = await API.graphql(
          graphqlOperation(listPostByUser, {
            filter: {userID: {eq: userId}},
          }),
        );
        // alert(JSON.stringify(post_response.data.listPosts.items));
        setPostList(post_response.data.listPosts.items);
        list = post_response.data.listPosts.items;
        // alert(JSON.stringify(list));
        list.map(async item => {
          if (item.video_url.startsWith('http')) {
            data.push({id: item.id, video_url: item.video_url});
            return;
          } else {
            uri = await Storage.get(item.video_url);
            data.push({id: item.id, video_url: uri});
          }
        });
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
            <Text>make friend</Text>
          </View>
          <View style={{flex: 1}}>
            <Text>posts</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          data={data}
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

export default Profiles;
