import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import ActivityIndicator from '../ActivityIndicator';
import { condition, day, maxTemperature, minTemperature, windSpeed } from '../../images';
import { fetchWeekWeather } from './WeatherApi';

function WeatherWeek() {
  const [isLoading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});
  
  const errorMessage = 'Не удалось получить информацию о погоде. \
Проверьте подключение к интернету.';
  
  fetchWeekWeather()
    .then(weather => setWeather(weather))
    .catch(() => alert(errorMessage))
    .finally(() => setLoading(false))
  
  function Separator({style=styles.separator}) {
    return (
      <View style={style}></View>
    );
  }
  
  function Header() {
    return (
      <View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Image style={styles.headerImage} source={day}></Image>
          </View>
          <View style={styles.cell}>
            <Image style={styles.headerImage} source={minTemperature}></Image>
          </View>
          <View style={styles.cell}>
            <Image style={styles.headerImage} source={maxTemperature}></Image>
          </View>
          <View style={styles.cell}>
            <Image style={styles.headerImage} source={condition}></Image>
          </View>
          <View style={styles.cell}>
            <Image style={styles.headerImage} source={windSpeed}></Image>
          </View>
        </View>
        <Separator style={styles.headerSeparator}/>
      </View>
    );
  }
  
  function Item({item}) {
    return (
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>{item.day}</Text>
        </View>
        <View style={styles.cell}>
            <Text style={styles.text}>{item.minTemperature}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{item.maxTemperature}</Text>
        </View>
        <View style={styles.cell}>
          <Image style={styles.image} source={item.condition}></Image>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{item.windSpeed}</Text>
        </View>
      </View>
    );
  }
  
  function renderItem({item}) {
    return (
      <Item item={item}/>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> :
        <FlatList 
          data={weather}
          renderItem={renderItem}
          keyExtractor={item => item.day}
          ListHeaderComponent={Header}
          ItemSeparatorComponent={Separator}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    padding: 5,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  headerImage: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 25,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
  },
  headerSeparator: {
    height: 2 * StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  },
});

export default WeatherWeek;