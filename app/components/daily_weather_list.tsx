import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import DailyWeatherItem from './daily_weather_item';
import { useAppSettings } from '../contexts/AppSettingsContext';

export default function DailyWeatherList() {
  const { appSettingsState } = useAppSettings();
  const totalDays = 7;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>7-day forecast</Text>
      <View>
        {Array.from({ length: totalDays }, (_, i) => i).map((index) => {
          const time = appSettingsState.weatherData?.daily?.time ? appSettingsState.weatherData?.daily?.time[index] : 0;
          const weatherCode = appSettingsState.weatherData?.daily?.weatherCode ? appSettingsState.weatherData?.daily?.weatherCode[index] : 0;
          const temperatureMax = appSettingsState.weatherData?.daily?.temperature2mMax ? appSettingsState.weatherData?.daily?.temperature2mMax[index] : 0;
          const temperatureMin = appSettingsState.weatherData?.daily?.temperature2mMin ? appSettingsState.weatherData?.daily?.temperature2mMin[index] : 0;
          return (<DailyWeatherItem
            key={index}
            index={index}
            time={time}
            weatherCode={weatherCode}
            temperatureMax={temperatureMax}
            temperatureMin={temperatureMin}
            isDay={appSettingsState.isDay}
          />);
        })}
      </View>
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
    marginBottom: 16
  }
});