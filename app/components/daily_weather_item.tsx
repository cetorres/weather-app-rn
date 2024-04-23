import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import WEATHER_CODES from '../models/weather_codes';
import { COLORS } from '../constants';

export interface DailyWeatherItemProps {
  index: number;
  time: number;
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  isDay: boolean;
};

const getWeekDayFromTimestamp = (time: number) => {
  const date = new Date(time * 1000).toLocaleString('en-US', { weekday: 'short' });
  return date;
}

export default function DailyWeatherItem({ index, time, weatherCode, temperatureMax, temperatureMin, isDay }: DailyWeatherItemProps) {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, width: 50, fontWeight: '300', color: isDay ? COLORS.light.color : COLORS.dark.color }}>{ index == 0 ? 'Today' : getWeekDayFromTimestamp(time) }</Text>
      <Image style={{width: 30, height: 30}} source={WEATHER_CODES[weatherCode][2]} tintColor={isDay ? COLORS.light.color : COLORS.dark.color} />
      <Text style={{ ...styles.text, color: '#1E88E5' }}>{ temperatureMin.toFixed(0) + '°' }</Text>
      <Text style={{ ...styles.text, color: '#E53935' }}>{ temperatureMax.toFixed(0) + '°' }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  smallContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    color: '#666'
  }
});