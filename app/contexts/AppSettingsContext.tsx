import { createContext, useContext, useEffect, useState } from "react";
import { CurrentLocation } from "../models/current_location";
import { WeatherData } from "../models/weather_data";
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

export interface AppSettingsState {
  isImperial: boolean;
  useCurrentLocation: boolean;
  currentLocation?: CurrentLocation | null;
  weatherData?: WeatherData | null;
  isDay: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: AppSettingsState = {
  isImperial: true,
  useCurrentLocation: true,
  currentLocation: null,
  weatherData: null,
  isDay: true,
  isLoading: false
};

export const AppSettingsContext = createContext({
  appSettingsState: INITIAL_STATE as AppSettingsState,
  setIsLoading: (value: boolean): void => { },
  setIsImperial: (value: boolean): void => { },
  setUseCurrentLocation: (value: boolean): void => { },
  setIsDay: (value: boolean): void => { },
  setCurrentLocation: (value: CurrentLocation | null): void => { },
  setWeatherData: (value: WeatherData | null): void => { },
  isSettingsLoaded: false
});

export const AppSettingsContextProvider = (props: any) => {
  const [state, setState] = useState<AppSettingsState>(INITIAL_STATE);
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);

  useEffect(() => {
    loadStateFromUserDefaults();
  }, []);

  const loadStateFromUserDefaults = () => {
    const isImperial = storage.getBoolean('isImperial') != undefined ? storage.getBoolean('isImperial') as boolean : true;
    const useCurrentLocation = storage.getBoolean('useCurrentLocation') != undefined ? storage.getBoolean('useCurrentLocation') as boolean : true;
    const isDay = storage.getBoolean('isDay') != undefined ? storage.getBoolean('isDay') as boolean : true;
    const currentLocation = storage.getString('currentLocation') != undefined ? JSON.parse(storage.getString('currentLocation')!) as CurrentLocation : null;
    const weatherData = storage.getString('weatherData') != undefined ? JSON.parse(storage.getString('weatherData')!) as WeatherData | null : null;
    setState((prevState) => ({
      ...prevState,
      isImperial: isImperial,
      useCurrentLocation: useCurrentLocation,
      isDay: isDay,
      currentLocation: currentLocation,
      weatherData: weatherData
    }));
    setIsSettingsLoaded(true);
  };

  const setIsLoading = (value: boolean) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: value
    }));
  };

  const setIsImperial = (value: boolean) => {
    storage.set('isImperial', value);
    setState((prevState) => ({
      ...prevState,
      isImperial: value
    }));
  };

  const setUseCurrentLocation = (value: boolean) => {
    storage.set('useCurrentLocation', value);
    setState((prevState) => ({
      ...prevState,
      useCurrentLocation: value
    }));
  };

  const setIsDay = (value: boolean) => {
    storage.set('isDay', value);
    setState((prevState) => ({
      ...prevState,
      isDay: value
    }));
  };

  const setCurrentLocation = (value: CurrentLocation | null) => {
    const dataStr = JSON.stringify(value);
    storage.set('currentLocation', dataStr);
    setState((prevState) => ({
      ...prevState,
      currentLocation: value
    }));
  };

  const setWeatherData = (value: WeatherData | null) => {
    const dataStr = JSON.stringify(value);
    storage.set('weatherData', dataStr);
    setState((prevState) => ({
      ...prevState,
      weatherData: value
    }));
  };

  return (
    <AppSettingsContext.Provider value={{
      appSettingsState: state,
      setIsLoading,
      setIsImperial,
      setUseCurrentLocation,
      setIsDay,
      setCurrentLocation,
      setWeatherData,
      isSettingsLoaded
    }}>
      {props.children}
    </AppSettingsContext.Provider>
  )
}

export function useAppSettings() {
  return useContext(AppSettingsContext);
}