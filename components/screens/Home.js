import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Currency from '../currency/Currency';
import WeatherToday from '../weather/WeatherToday';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <WeatherToday navigation={navigation} style={styles.weather}/>
      <View style={styles.separator}></View>
      <Currency style={styles.currency}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  weather: {
    flex: 3,
  },
  currency: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
  }
});

export default HomeScreen;