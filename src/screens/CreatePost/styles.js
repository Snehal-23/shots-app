import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  textInput: {
    margin: 10,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    color: 'white',
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
});

export default styles;
