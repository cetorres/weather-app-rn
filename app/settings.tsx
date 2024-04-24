import { View, StyleSheet, Text, ScrollView, Switch, TouchableOpacity, Alert, Linking, StatusBar } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import { useAppSettings } from './contexts/AppSettingsContext';
import useWeather from './hooks/useWeather';

export default function SettingsPage() {
  const { appSettingsState, setIsLoading, setIsImperial } = useAppSettings();
  const { loadWeatherData, saveUseCurrentLocation } = useWeather();
  const navigation = useNavigation();

  const showAbout = () => {
    Alert.alert(
      'About Weather',
      `Version: 1.0\n
A weather app made in React Native using Open Meteo (https://open-meteo.com/) API.\n
Please visit the GitHub repo for more info.\n
© 2024 Carlos E. Torres`,
      [
        {
          text: 'Visit my website',
          onPress: async () => {
            await Linking.openURL('https://cetorres.com');
          }
        },
        {
          text: 'View GitHub repo',
          onPress: async () => {
            await Linking.openURL('https://github.com/cetorres/weather-app-rn');
          }
        },
        {text: 'Close', style: 'cancel'},
      ]
    );
  };

  const handleSearchLocation = () => {
    navigation.navigate('search');
  }

  const toggleUnits = (value: boolean) => {
    setIsImperial(!value);
    setIsLoading(true);
    loadWeatherData(null, !value);
  }

  return (
    <ScrollView>
      <View style={styles.listItem}>
        <View style={styles.listItemTextView}>
          <MaterialIcons name="my-location" size={20} />
          <Text style={styles.listItemText}>Use my current location</Text>
        </View>
        <Switch value={Number(appSettingsState.useCurrentLocation) == 1 ? true : false} onValueChange={(value) => saveUseCurrentLocation(value)} />
      </View>
      <TouchableOpacity style={styles.listItem} disabled={appSettingsState.useCurrentLocation} onPress={handleSearchLocation}>
        <View style={styles.listItemTextView}>
          <MaterialIcons name="location-on" size={20} color={appSettingsState.useCurrentLocation ? '#ccc' : '#666'} />
          <Text style={{ ...styles.listItemText, color: appSettingsState.useCurrentLocation ? '#ccc' : '#000' }}>Select location</Text>
        </View>
        <Text style={{ ...styles.listItemTextRight, color: appSettingsState.useCurrentLocation ? '#ccc' : '#666' }}>{ appSettingsState.currentLocation?.city }</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem} onPress={() => toggleUnits(appSettingsState.isImperial)}>
        <View style={styles.listItemTextView}>
          <MaterialIcons name="language" size={20} />
          <Text style={styles.listItemText}>Units</Text>
        </View>
        <Text style={styles.listItemTextRight}>{appSettingsState.isImperial ? 'Fahrenheit' : 'Celcius'}</Text>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <TouchableOpacity style={styles.listItem} onPress={showAbout}>
        <View style={styles.listItemTextView}>
          <MaterialIcons name="info" size={20} />
          <Text style={styles.listItemText}>About Weather</Text>
        </View>
      </TouchableOpacity>
      <StatusBar barStyle='dark-content' />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    padding: 16,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemTextView: {
    flexDirection: 'row',
    gap: 14
  },
  listItemText: {
    fontSize: 17,
    color: '#000'
  },
  listItemTextRight: {
    fontSize: 17,
    color: '#666'
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8
  }
});
