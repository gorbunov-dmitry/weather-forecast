import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActivityIndicator from '../ActivityIndicator';
import NavigationButton from '../NavigationButton';
import { fetchTodayWeather } from './WeatherApi';

function WeatherToday(props) {
  const [isLoading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});
  
  const errorMessage = 'Не удалось получить информацию о погоде. \
Проверьте подключение к интернету.';

  fetchTodayWeather()
    .then(weather => setWeather(weather))
    .catch(() => alert(errorMessage))
    .finally(() => setLoading(false))

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.header}>
        <Text style={styles.title}>Погода сегодня</Text>
        <Text style={styles.text}>Владивосток</Text>
      </View>
      {isLoading ? <ActivityIndicator/> :
        <>
          <Text style={styles.temperature}>{weather.average}</Text>
          <View style={styles.rowsContainer}>
            <View style={styles.row}>
              <Text style={styles.text}>{weather.condition.label}</Text>
              <Text style={styles.text}>{weather.condition.content}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>{weather.minTemperature.label}</Text>
              <Text style={styles.text}>{weather.minTemperature.content}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>{weather.maxTemperature.label}</Text>
              <Text style={styles.text}>{weather.maxTemperature.content}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>{weather.windSpeed.label}</Text>
              <Text style={styles.text}>{weather.windSpeed.content}</Text>
            </View>
          </View>
        </>
      }
      <NavigationButton navigation={props.navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  rowsContainer: {
    minWidth: 250,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
  },
  text: {
    fontSize: 25,
  },
  temperature: {
    fontSize: 45,
  },
});

export default WeatherToday;