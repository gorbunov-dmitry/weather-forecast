import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActivityIndicator from '../ActivityIndicator';
import fetchCurrency from './CurrencyApi';

function Currency(props) {
  const [isLoading, setLoading] = useState(true);
  const [currency, setCurrency] = useState({});

  const errorMessage = 'Не удалось получить информацию о валюте. \
Проверьте подключение к интернету.';

  fetchCurrency('usd', 'rub')
    .then(currency => setCurrency(currency))
    .catch(() => alert(errorMessage))
    .finally(() => setLoading(false))

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.title}>Валюта сегодня</Text>
      {isLoading ? <ActivityIndicator/> :
        <Text style={styles.text}>1$ = {currency}₽</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 35,
  },
  text: {
    fontSize: 25,
  },
});

export default Currency;