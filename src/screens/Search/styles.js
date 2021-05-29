import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // padding: 20,
    // backgroundColor: 'white',
  },
  textInput: {
    margin: 10,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    zIndex: 1,
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 2,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#0375FB',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  topContainer: {
    height: '40%',
    // backgroundColor: 'gold',
    paddingTop: 10,
    paddingHorizontal: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
  bottomContainer: {
    height: '60%',
    marginLeft: 8,
    marginTop: 8,
    // backgroundColor: 'pink',
  },
});

export default styles;
