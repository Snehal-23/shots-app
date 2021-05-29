import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './styles';
import awaitAsyncGenerator from '@babel/runtime/helpers/esm/awaitAsyncGenerator';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import {Storage, Auth, API, graphqlOperation} from 'aws-amplify';
import {useRoute} from '@react-navigation/native';
import {createPost} from '../../graphql/mutations';

const CreatePost = ({}) => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);
  const [title, setTitle] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const [videoUrl, setVideoUrl] = useState();
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(100000001);
  const onPlayPause = () => {
    setPaused(!paused);
  };
  const uploadToStorage = async imagePath => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const filename = `${index}.mp4`;
      const s3Response = await Storage.put(filename, blob);
      setVideoKey(s3Response.key);
      // alert(JSON.stringify(s3Response));
      setVideoUrl(await Storage.get(s3Response.key));
      setIndex(index + 1);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    uploadToStorage(route.params.video_url);
  }, []);

  const onPublish = async () => {
    // create post in the database (API)
    if (!videoKey) {
      console.warn('Video is not yet uploaded');
      return;
    }

    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const newPost = {
        video_url: videoKey,
        desciption: description,
        title: title,
        userID: userInfo.attributes.sub,
        songID: '874e84fb-4f85-4dee-ab29-ab27fe473404',
      };

      const response = await API.graphql(
        graphqlOperation(createPost, {input: newPost}),
      );
      // alert(JSON.stringify(response));
      navigation.navigate('Home', {screen: 'Home'});
    } catch (e) {
      console.error(e);
    }
  };

  const onDiscard = () => {
    alert('Are you sure you want to discard the post');
  };
  return (
    <View style={styles.container}>
      {videoUrl ? (
        <TouchableWithoutFeedback onPress={onPlayPause}>
          <Video
            source={{
              uri: videoUrl,
              // uri: 'https://player.vimeo.com/external/480415933.sd.mp4?s=4d225730a98c210bcd9935c1bb67ae1598b94ffb&profile_id=165&oauth2_token_id=57447761',
            }}
            // source={require('../../assets/big_buck_bunny.mp4')}
            style={{height: '60%', width: '100%', top: 0, zIndex: 0}}
            resizeMode={'cover'}
            onError={(e: LoadError) => console.log(e)}
            repeat={true}
            // controls={true}
            paused={paused}
            // fullscreenAutorotate={true}
          />
        </TouchableWithoutFeedback>
      ) : (
        <ActivityIndicator
          animating={!videoKey}
          size={'large'}
          color={'white'}
          style={{top: '25%'}}
        />
      )}

      <View style={{alignContent: 'flex-end'}}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder={'Enter title'}
          placeholderTextColor="white"
          style={styles.textInput}
        />
        <TextInput
          value={description}
          onChangeText={setDescription}
          numberOfLines={5}
          placeholder={'Description'}
          placeholderTextColor="white"
          style={styles.textInput}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={onPublish} style={{flex: 1}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Publish</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDiscard} style={{flex: 1}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Discard</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePost;
