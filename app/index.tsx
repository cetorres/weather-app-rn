import { Stack, useNavigation } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WEATHER_CODES from './models/weather_codes';
import Ionicons from '@expo/vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import HourlyWeatherList from './components/hourly_weather_list';
import DailyWeatherList from './components/daily_weather_list';
import { useAppSettings } from './contexts/AppSettingsContext';
import useWeather from './hooks/useWeather';
import { WeatherData } from './models/weather_data';
import { COLORS } from './constants';

export default function IndexPage() {
  const { appSettingsState, setIsLoading, isSettingsLoaded } = useAppSettings();
  const { loadWeatherData, isRefreshing, setIsRefreshing } = useWeather();
  const navigation = useNavigation();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const weatherAnimationRef = useRef(null);

  useEffect(() => {
    // Handle app state (foreground, background)
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsLoading(true);
        loadWeatherData();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useFocusEffect(useCallback(() => {
    // This will run when screen is `focused` or mounted.
    StatusBar.setBarStyle(appSettingsState.isDay ? 'dark-content' : 'light-content');
  
    // This will run when screen is `blured` or unmounted.
    return () => {
      StatusBar.setBarStyle('dark-content');
    }
  }, [appSettingsState.isDay]));

  useEffect(() => {
    if (isSettingsLoaded) {
      setIsLoading(true);
      loadWeatherData().then(() => {
        StatusBar.setBarStyle(appSettingsState.isDay ? 'dark-content' : 'light-content');
      });
    }
  }, [isSettingsLoaded]);
  
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadWeatherData();
  }, []);

  const showSettings = () => {
    navigation.navigate('settings');
  };

  const getCondition = (weatherData: WeatherData | null | undefined) => {
    const weatherCode = weatherData?.current?.weatherCode;
    if (weatherCode != undefined)
      return WEATHER_CODES[weatherCode][0];
    return '';
  };

  const getWeatherAnimation = (weatherData: WeatherData | null | undefined) => {
    const weatherCode = weatherData?.current?.weatherCode;
    const isDay = weatherData?.current?.isDay;
    if (weatherCode != undefined) {
      const anim = WEATHER_CODES[weatherCode][1][isDay == 1 ? 0 : 1];
      return (<LottieView
        autoPlay
        ref={weatherAnimationRef}
        style={{
          width: 100,
          height: 100,
        }}
        source={anim}
      />);
    }
    return null
  };

  return (
    <SafeAreaView style={{backgroundColor: appSettingsState.isDay ? COLORS.light.backgroundColor : COLORS.dark.backgroundColor}}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor={appSettingsState.isDay ? COLORS.dark.backgroundColor : COLORS.light.backgroundColor} refreshing={isRefreshing} onRefresh={onRefresh} />}>
        <View style={styles.container}>
          <Stack.Screen
            options={{
              headerStyle: {backgroundColor: appSettingsState.isDay ? COLORS.light.backgroundColor : COLORS.dark.backgroundColor},
              headerLeft: () => <ActivityIndicator hidesWhenStopped={true} animating={appSettingsState.isLoading} color={appSettingsState.isDay ? COLORS.dark.backgroundColor : COLORS.light.backgroundColor} />,
              headerRight: () => <TouchableOpacity onPress={showSettings}><Ionicons name="settings-sharp" size={22} color={appSettingsState.isDay ? COLORS.light.color : COLORS.dark.color} /></TouchableOpacity>
            }}
          />
          <Text style={{ ...styles.cityName, color: appSettingsState.isDay ? COLORS.light.color : COLORS.dark.color }}>{ appSettingsState?.currentLocation ? appSettingsState.currentLocation?.city : '--' }</Text>
          <Text style={{ ...styles.temperature, color: appSettingsState.isDay ? COLORS.light.color : COLORS.dark.color }}>{ appSettingsState?.weatherData?.current?.temperature2m ? appSettingsState.weatherData?.current?.temperature2m?.toFixed(0) + '°' : '--' }</Text>
          <Text style={{ ...styles.condition, color: appSettingsState.isDay ? COLORS.light.color : COLORS.dark.color }}>{ getCondition(appSettingsState.weatherData) }</Text>
          <Text style={{ ...styles.minMax, color: appSettingsState.isDay ? COLORS.light.color : COLORS.dark.color }}>
            L: {appSettingsState.weatherData?.daily?.temperature2mMin ? appSettingsState.weatherData?.daily?.temperature2mMin[0].toFixed(0) + '°' : ''}
            &nbsp;&nbsp;&nbsp;
            H: {appSettingsState.weatherData?.daily?.temperature2mMax ? appSettingsState.weatherData?.daily?.temperature2mMax[0].toFixed(0) + '°' : ''}
          </Text>
          {getWeatherAnimation(appSettingsState.weatherData)}
        </View>
        {appSettingsState.weatherData != undefined && appSettingsState.weatherData != null ?
          <HourlyWeatherList /> : null}
        {appSettingsState.weatherData != undefined && appSettingsState.weatherData != null ?
          <DailyWeatherList /> : null}
      </ScrollView>
      <StatusBar barStyle={appSettingsState.isDay ? 'dark-content' : 'light-content'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cityName: {
    fontWeight: '200',
    fontSize: 28
  },
  temperature: {
    fontWeight: '200',
    fontSize: 90,
    paddingLeft: 28
  },
  condition: {
    fontWeight: '200',
    fontSize: 22
  },
  minMax: {
    fontWeight: '200',
    fontSize: 20,
    marginTop: 5
  }
});
