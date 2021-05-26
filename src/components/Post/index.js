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
          {/* <View
            style={{
              justifyContent: 'center',
              marginRight: '7%',
            }}>
            <Image
              source={{
                uri: post.user.user_profile,
                height: 50,
                width: 50,
              }}
              style={{borderRadius: 25}}
            />
          </View> */}
          <View style={{justifyContent: 'center'}}>
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
      <View style={styles.bottomContainer}>
        <View style={{flex: 1, flexDirection: 'column', marginStart: '2%'}}>
          <Text style={styles.desc}>{post.description}</Text>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Entypo name={'beamed-note'} size={24} color="white" />
            <Text style={styles.song}>{post.song}</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            marginTop: 30,
            marginRight: 8,
          }}>
          <Image
            source={{
              uri: post.song_image,
              height: 40,
              width: 40,
            }}
            style={{borderRadius: 20, borderWidth: 1, borderColor: '#0375FB'}}
          />
        </View>
      </View>
    </View>
  );
};

export default Post;
