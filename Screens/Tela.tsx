import { useEffect, useState } from 'react';
import React, { Component } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Calendar, LocaleConfig, Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import Schedule from './Schedule'

LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
};
LocaleConfig.defaultLocale = 'pt';

// export default Schedule

export function Tela() {

  return (
    <>
      <Schedule></Schedule>
    </>
  )
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
