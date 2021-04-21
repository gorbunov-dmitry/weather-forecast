import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

function NavigationButton({navigation}) {

  function onPress() {
    return navigation.navigate('Погода на неделю');
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>На всю неделю</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  text: {
    fontSize: 25,
    color: 'white',
  },
});

export default NavigationButton;