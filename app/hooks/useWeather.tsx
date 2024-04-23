import { useEffect, useState } from 'react'
import { AppSettingsState, useAppSettings } from '../contexts/AppSettingsContext';
import LocationService from '../services/location_service';
import WeatherService from '../services/weather_service';
import { CurrentLocation } from '../models/current_location';

let localAppSettingsState: AppSettingsState;

export default function useWeather() {
  const { appSettingsState, setIsLoading, setUseCurrentLocation, setIsDay, setCurrentLocation, setWeatherData } = useAppSettings();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    localAppSettingsState = appSettingsState;
  }, [appSettingsState]);
  
  const loadWeatherData = async (location: CurrentLocation | null = null, isImperial: boolean | undefined = undefined) => {
    if (location == null && localAppSettingsState.currentLocation == null) {
      const locationService = new LocationService();
      location = await locationService.getCurrentLocation();
      setCurrentLocation(location);
    }
    else if (location != null) {
      // Use location
    }
    else if (localAppSettingsState.currentLocation != null) {
      location = localAppSettingsState.currentLocation!
    }

    if (location && location.latitude && location.longitude) {
      const weatherService = new WeatherService();
      const data = await weatherService.getWeatherData(location.latitude, location.longitude, (isImperial != undefined ? isImperial : localAppSettingsState.isImperial));
      setWeatherData(data);
      setIsDay(data?.current?.isDay == 1 ? true : false);
    }

    setIsRefreshing(false);
    setIsLoading(false);
  };

  const saveUseCurrentLocation = async (value: boolean) => {
    setUseCurrentLocation(value);

    if (value) {
      const locationService = new LocationService();
      const location = await locationService.getCurrentLocation();
      setCurrentLocation(location);
      setIsLoading(true);
      loadWeatherData(location);
    }
  };

  return { loadWeatherData, isRefreshing, setIsRefreshing, saveUseCurrentLocation };
}