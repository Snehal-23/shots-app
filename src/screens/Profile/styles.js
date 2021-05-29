import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
  button: {
    backgroundColor: '#ff4747',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topContainer: {
    height: '40%',
    paddingTop: 30,
    paddingHorizontal: 30,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  bottomContainer: {
    height: '60%',
    marginLeft: 8,
  },
});

export default styles;
