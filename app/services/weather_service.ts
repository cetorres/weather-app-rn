import axios from 'axios';
import { WeatherData } from '../models/weather_data';

export default class WeatherService {
  static readonly WEATHER_URL =
    "https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,weather_code,is_day,precipitation,rain,showers,snowfall,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m,weather_code,rain,showers,snowfall,wind_speed_10m&timezone=auto&timeformat=unixtime";

  private readonly imperialUnits = "&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch";

  constructor() {}

  async getWeatherData(latitude: number, longitude: number, isImperial: boolean = true): Promise<WeatherData | null> {
    const url = `${WeatherService.WEATHER_URL}&latitude=${latitude}&longitude=${longitude}${isImperial ? this.imperialUnits : ''}`;

    try {
      const response = await axios.get(url);
      return WeatherData.fromJSON(response.data);
    } catch (error) {
      console.log('WeatherService - getWeatherData - Error: Could not get weather data', error);
    }

    return null;
  }
}