import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../conts/colors';

const { COLORS, LIGHT, DARK } = theme;

function CalendarWidget() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'short'});
  const dayOfWeek = currentDate.getDay();
  return (
    <View style={styles.container}>
      <Text style={styles.monthText}>{month}</Text>
      <Text style={styles.dayText}>{day}</Text>
      <Text style={styles.dayOfWeekText}>{
        (dayOfWeek == 1) ? "Lundi"
        : (dayOfWeek == 2) ? "Mardi"
        : (dayOfWeek == 3) ? "Mercredi"
        : (dayOfWeek == 4) ? "Jeudi"
        : (dayOfWeek == 5) ? "Vendredi"
        : (dayOfWeek == 6) ? "Samedi"
        : "Dimanche"
      }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT.surfaceVariant,
    height: 150,
    width: "95%",
    marginHorizontal: 10,
    marginBottom: 80,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: LIGHT.onSurfaceVariant,
  },
  monthText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: LIGHT.onSurfaceVariant,
  },
  dayOfWeekText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: LIGHT.onSurfaceVariant
  },
});

export default CalendarWidget;
