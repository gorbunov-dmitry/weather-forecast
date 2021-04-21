import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/screens/Home';
import Week from './components/screens/Week';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Главная' component={Home}/>
        <Stack.Screen name='Погода на неделю' component={Week}/>
      </Stack.Navigator>
      <StatusBar style='auto'/>
    </NavigationContainer>
  );
}

export default App;