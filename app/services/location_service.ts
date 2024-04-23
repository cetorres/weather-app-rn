
import axios from 'axios';
import * as Location from 'expo-location';
import { CurrentLocation } from '../models/current_location';
import { LocationData } from '../models/location_data';
import { LocationAccuracy } from 'expo-location';

const LOCATION_URL = "https://geocoding-api.open-meteo.com/v1/search?count=10&language=en&format=json";

export default class LocationService {
  constructor() {}

  async getCurrentLocation(): Promise<CurrentLocation> {
    // Check if location services are enabled
    const serviceEnabled = await Location.hasServicesEnabledAsync();
    if (!serviceEnabled) {
      Promise.reject('Location services are disabled.');
    }
    // Check location permissions
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Promise.reject('Permission to access location was denied.');
    }

    // If permissions are granted, get the current location
    const position = await Location.getCurrentPositionAsync({accuracy: LocationAccuracy.Highest});
    const places = await Location.reverseGeocodeAsync(position.coords);
    const name = places[0]?.name ?? 'No location name';
    const city = places[0]?.city ?? 'No city name';
    const currentLocation = new CurrentLocation(name, city, position.coords.latitude, position.coords.longitude);
    return currentLocation;
  }

  async searchLocationByName(name: string): Promise<LocationData | null> {
    try {
      const response = await axios.get(`${LOCATION_URL}&name=${name}`);
      return new LocationData(response.data);
    } catch (error) {
      console.log('LocationService - searchLocationByName - Error: Could not get location data.', error);
    }

    return null;
  }
}
