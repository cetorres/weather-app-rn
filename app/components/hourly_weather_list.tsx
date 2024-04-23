import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import HourlyWeatherItem from './hourly_weather_item';
import { useAppSettings } from '../contexts/AppSettingsContext';
import { COLORS } from '../constants';

export default function HourlyWeatherList() {
  const { appSettingsState } = useAppSettings();
  const totalHours = 25;

  const getTimeStartIndex = (times?: number[] | undefined) => {
    if (times == null) return 0;
    const now = new Date();
    const currentHour = now.getHours();
    for (let i = 0; i < times.length; i++) {
      const date = new Date(times[i] * 1000);
      if (date.getHours() == currentHour) {
        return i;
      }
    }
    return 0;
  };

  const timeStartIndex = getTimeStartIndex(appSettingsState.weatherData?.hourly?.time);

  const times = appSettingsState.weatherData?.hourly?.time?.slice(timeStartIndex, timeStartIndex + totalHours);
  const weatherCodes = appSettingsState.weatherData?.hourly?.weatherCode?.slice(timeStartIndex, timeStartIndex + totalHours);
  const temperatures = appSettingsState.weatherData?.hourly?.temperature2m?.slice(timeStartIndex, timeStartIndex + totalHours);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hourly Forecast</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {times?.map((time, index) => 
          <HourlyWeatherItem
            key={time}
            index={index}
            time={time}
            weatherCode={weatherCodes ? weatherCodes[index] : 0}
            temperature={temperatures ? temperatures[index] : 0}
            isDay={appSettingsState.isDay}
          />
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 8
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 14,
    color: 'grey',
    marginBottom: 11
  }
});