import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './styles';
import awaitAsyncGenerator from '@babel/runtime/helpers/esm/awaitAsyncGenerator';
import {useNavigation} from '@react-navigation/native';

const CreatePost = ({}) => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);
  const [title, setTitle] = useState('');
  const onPublish = () => {
    alert('pub');
  };
  const onDiscard = () => {
    alert('sdh');
  };
  return (
    <View style={styles.container}>
      {/* <Video
          source={require('../../assets/big_buck_bunny.mp4')}
          source={{
            uri: post.video_url,
          }}
          style={styles.video}
          resizeMode={'cover'}
          onError={(e: LoadError) => console.log(e)}
          repeat={true}
          controls={true}
          paused={paused}
          fullscreenAutorotate={true}
        /> */}
      <View style={{alignContent: 'flex-end', top: '60%'}}>
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
