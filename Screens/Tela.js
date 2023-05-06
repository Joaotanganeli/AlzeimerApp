import { useEffect, useState } from 'react';
import React, { Component } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import dayjs from 'dayjs';

export function Tela() {
  return (
    <>
      <View style={styles.topContainer}>
        <Text>sexo sexo sexo sem parar</Text>
      </View>
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
    marginTop: 0,
  }
});
