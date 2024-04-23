import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import WEATHER_CODES from '../models/weather_codes';
import { COLORS } from '../constants';

export interface HourlyWeatherItemProps {
  index: number;
  time: number;
  weatherCode: number;
  temperature: number;
  isDay: boolean;
};

const getHourFromTimestamp = (time: number) => {
  const date = new Date(time * 1000).toLocaleString('en-US', { hour: 'numeric', hour12: true });
  return date;
}

export default function HourlyWeatherItem({ index, time, weatherCode, temperature, isDay }: HourlyWeatherItemProps) {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, color: isDay ? COLORS.light.color : COLORS.dark.color }}>{index == 0 ? 'NOW' : getHourFromTimestamp(time)}</Text>
      <Image style={{width: 30, height: 30}} source={WEATHER_CODES[weatherCode][2]} tintColor={isDay ? COLORS.light.color : COLORS.dark.color } />
      <Text style={{ ...styles.text, color: isDay ? COLORS.light.color : COLORS.dark.color }}>{ temperature.toFixed(0) + '°' }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 28
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 17,
    fontWeight: '300',
    color: '#666'
  }
});