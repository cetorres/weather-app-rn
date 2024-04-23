import { Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native'
import React, { useState } from 'react'
import { Stack, useNavigation } from 'expo-router';
import LocationService from './services/location_service';
import { Result } from './models/location_data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CurrentLocation } from './models/current_location';
import { useAppSettings } from './contexts/AppSettingsContext';
import useWeather from './hooks/useWeather';

export default function SearchPage() {
  const { setIsLoading, setCurrentLocation } = useAppSettings();
  const { loadWeatherData } = useWeather();
  const [locationData, setLocationData] = useState([] as Result[]);
  const navigation = useNavigation();

  const searchLocation = async (text: string) => {
    const locationService = new LocationService();
    const data = await locationService.searchLocationByName(text?.trim());
    setLocationData(data?.results ?? []);
  };

  const handleSelectItem = async (item: Result) => {
    const name = item.name ?? '';
    const latitude = item.latitude ?? 0;
    const longitude = item.longitude ?? 0;
    const city = item.name ?? '';
    const newLocation = new CurrentLocation(name, city, latitude, longitude);
    setCurrentLocation(newLocation);
    setIsLoading(true);
    loadWeatherData(newLocation);
    navigation.goBack();
  };
  
  return (
    <>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            autoFocus: true,
            placeholder: 'Search for a location',
            hideWhenScrolling: false,
            autoCapitalize: 'words',
            onSearchButtonPress: (e) => {
              searchLocation(e.nativeEvent.text);
            },
            onClose: () => {
              navigation.goBack();
            },
            onCancelButtonPress: () => {
              navigation.goBack();
            }
          },
        }}
      />
      <SafeAreaView>
        <FlatList
          style={{ ...styles.list, paddingTop: Platform.OS == 'ios' ? 52 : 0 }}
          data={locationData}
          renderItem={({ item }) => {
            const locationName = `${item.name}${item.admin1 != null ? ', ' + item.admin1 : ''}`;
            return (
              <TouchableOpacity onPress={() => handleSelectItem(item)}>
                <Text style={styles.item}>{`${locationName}, ${item.country}`}</Text>
              </TouchableOpacity>
            );
          }
          }
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <StatusBar barStyle='dark-content' />
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    height: '100%'
  },
  item: {
    fontSize: 17,
    paddingVertical: 14,
    paddingHorizontal: 16
  }
});