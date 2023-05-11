import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Button, Image, Text, View, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Tela } from './Screens/Tela';
import { Checklist } from './Screens/ChecklistScreen';
import { Alarm } from './Screens/Alarms';

export default function App() {

  const Stack = createStackNavigator();
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 1)

    return () => clearInterval(interval)

  }, [])

  require('dayjs/locale/pt');
  dayjs.locale("pt");


  function HomeScreen({ navigation }) {
    return (
      <>
        <View style={styles.topContainer}>
          <View style={styles.image}>
            <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
              }}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.textHeadingStyle}>
              Quem sou eu?
            </Text>
          </View>
          <View style={styles.clock}>
            <Text style={styles.date}>{date.format("dddd, DD MMMM YYYY")}</Text>
            <Text style={styles.time}>{date.format("hh:mm")}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.LayoutButtonContainer} onPress={() => navigation.navigate('Checklist')}>
                <Text style={styles.title}>Cheklist</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.LayoutButtonContainer} onPress={() => navigation.navigate('Tela')}>
                <Text style={styles.title}>Compromissos</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.LayoutButtonContainer} onPress={() => navigation.navigate('Alarm')}>
                <Text style={styles.title}>Alarmes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.LayoutButtonContainer} onPress={() => navigation.navigate('Tela')}>
                <Text style={styles.title}>Contatos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.LayoutButtonContainer} onPress={() => navigation.navigate('Tela')}>
                <Text style={styles.title}>Emergencia</Text>
              </TouchableOpacity>
          </View>
        </View>


      </>
    )
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
          <Stack.Screen name="Tela" component={Tela}></Stack.Screen>
          <Stack.Screen name="Checklist" component={Checklist}></Stack.Screen>
          <Stack.Screen name="Alarm" component={Alarm}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 40,
  },

  buttonsContainer: {
    flex: 1,
    backgroundColor: 'blue',
    width: 100,
    height: 90,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  row: {
    flexDirection: 'row',
  },

  date: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 20,
  },
  time: {
    fontSize: 62,
    fontWeight: "bold",
    color: "black",
  },

  clock: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },

  textHeadingStyle: {
    marginTop: 10,
    fontSize: 28,
    color: '#0250a3',
    fontWeight: 'bold',
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
},
});
