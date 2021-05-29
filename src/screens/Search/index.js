import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  TextInput,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import {useFocusEffect} from '@react-navigation/native';
import Video, {LoadError} from 'react-native-video';
import {API, graphqlOperation} from 'aws-amplify';
import {listUsers} from '../../graphql/queries';
import {Auth} from 'aws-amplify';
import {set} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
const Search = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [users, setUsers] = useState();
  const navigation = useNavigation();
  const fetchUsers = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listUsers));
      setUsers(response.data.listUsers.items);
      //   alert(JSON.stringify(response.data.listUsers.items));
      setFilteredDataSource(response.data.listUsers.items);
      setMasterDataSource(response.data.listUsers.items);
    } catch (e) {
      console.log(JSON.stringify(e.message));
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.user_name
          ? item.user_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <TouchableOpacity onPress={() => getItem(item)}>
        <View
          style={{
            flexDirection: 'row',
            height: 70,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{width: '20%', justifyContent: 'center'}}>
            <Image
              source={{
                uri: item.user_profile,
                height: 50,
                width: 50,
              }}
              style={{borderRadius: 25}}
            />
          </View>
          <View style={{width: '70%', justifyContent: 'center'}}>
            <Text
              style={{
                ...styles.itemStyle,
                fontWeight: 'bold',
                color: 'black',
                marginStart: -5,
              }}>
              {item.user_fn} {item.user_ln} @
              <Text style={{color: '#0375FB'}}>{item.user_name}</Text>
            </Text>
            <Text style={{fontWeight: '600'}}> {item.user_bio}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#0375FB',
        }}
      />
    );
  };

  const getItem = item => {
    // Function for click on an item
    // alert('Id : ' + item.id + ' Title : ' + item.user_bio);
    navigation.navigate('Profiles', {user_id: item.id});
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
