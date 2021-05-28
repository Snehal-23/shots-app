import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Video, {LoadError} from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from './styles';

const Post = props => {
  const [post, setPost] = useState(props.post);
  const [paused, setPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const onPlayPause = () => {
    setPaused(!paused);
  };
  const onLike = () => {
    const likesToAdd = isLiked ? -1 : 1;
    setPost({
      ...post,
      likes: post.likes + likesToAdd,
    });
    setIsLiked(!isLiked);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPause}>
        <Video
          // source={require('../../assets/big_buck_bunny.mp4')}
          source={{
            uri: post.video_url,
          }}
          style={styles.video}
          resizeMode={'cover'}
          onError={(e: LoadError) => console.log(e)}
          repeat={true}
          // controls={true}
          paused={paused}
          fullscreenAutorotate={true}
        />
      </TouchableWithoutFeedback>
      <View style={styles.topContainer}>
        <View style={styles.box} />
        <View style={styles.boxContent}>
          <Image
            source={{
              uri: post.user.user_profile,
              height: 50,
              width: 50,
            }}
            style={{borderRadius: 25}}
          />
          <View style={{justifyContent: 'center', marginStart: 10}}>
            <Text style={styles.title}>{post.user.user_name}</Text>
            <Text style={styles.desc}>{post.user.user_bio}</Text>
          </View>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={onLike}>
          <AntDesign
            name={'heart'}
            size={38}
            color={isLiked ? 'white' : '#0375FB'}
          />
          <Text style={styles.iconLabel}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <FontAwesome name={'comments'} size={42} color="white" />
          <Text style={styles.iconLabel}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Fontisto name={'share-a'} size={33} color="white" />
          <Text style={styles.iconLabel}>{post.shares}</Text>
        </TouchableOpacity>
      </View>
      <View style={{...styles.bottomContainer}}>
        <View
          style={{
            flexDirection: 'column',
            marginStart: '2%',
          }}>
          <Text style={styles.desc}>{post.desciption}</Text>

          <View
            style={{
              marginTop: -10,
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <Entypo name={'beamed-note'} size={24} color="white" />
            <Text style={styles.song}>song name</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            marginTop: 20,
            marginRight: 8,
          }}>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,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',
              height: 40,
              width: 40,
            }}
            style={{borderRadius: 20, borderWidth: 3, borderColor: '#0375FB'}}
          />
        </View>
      </View>
    </View>
  );
};

export default Post;
