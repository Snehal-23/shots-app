import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    height: Dimensions.get('window').height,
  },
  video: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  },
  topContainer: {
    height: '100%',
    top: '2%',
    position: 'absolute',
    left: '3%',
  },
  bottomContainer: {
    height: '10%',
    top: '80%',
    width: '95%',
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    height: '30%',
    top: '35%',
    // position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
  },
  whiteText: {
    color: 'white',
    fontSize: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  desc: {
    color: 'white',
    fontSize: 16,
  },
  boxContent: {
    position: 'absolute',
    marginLeft: '5%',
    marginTop: '1.5%',
    flexDirection: 'row',
  },
  iconContainer: {
    padding: 10,
    justifyContent: 'center',
  },
  iconLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
