/*
Code	Description
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
 */

const WEATHER_CODES = {
  0: ['Clear sky', [require('../../assets/sun.json'), require('../../assets/moon.json')], require('../../assets/weather_icons/wi-day-sunny.svg.png')],
  1: ['Mainly clear', [require('../../assets/sun.json'), require('../../assets/moon.json')], require('../../assets/weather_icons/wi-day-sunny-overcast.svg.png')],
  2: ['Partly cloudy', [require('../../assets/partially_cloudy.json'), require('../../assets/partially_cloudy.json')], require('../../assets/weather_icons/wi-day-cloudy.svg.png')],
  3: ['Overcast', [require('../../assets/clouds.json'), require('../../assets/clouds.json')], require('../../assets/weather_icons/wi-day-cloudy-high.svg.png')],
  45: ['Fog', [require('../../assets/fog.json'), require('../../assets/fog.json')], require('../../assets/weather_icons/wi-fog.svg.png')],
  48: ['Depositing rime fog', [require('../../assets/fog.json'), require('../../assets/fog.json')], require('../../assets/weather_icons/wi-fog.svg.png')],
  51: ['Light drizzle', [require('../../assets/sun_rain.json'), require('../../assets/sun_rain.json')], require('../../assets/weather_icons/wi-rain-mix.svg.png')],
  53: ['Moderate drizzle', [require('../../assets/sun_rain.json'), require('../../assets/sun_rain.json')], require('../../assets/weather_icons/wi-rain-mix.svg.png')],
  55: ['Dense drizzle', [require('../../assets/sun_rain.json'), require('../../assets/sun_rain.json')], require('../../assets/weather_icons/wi-rain-mix.svg.png')],
  56: ['Light freezing drizzle', [require('../../assets/freezing_drizzle.json'), require('../../assets/freezing_drizzle.json')], require('../../assets/weather_icons/wi-rain-mix.svg.png')],
  57: ['Dense freezing drizzle', [require('../../assets/freezing_drizzle.json'), require('../../assets/freezing_drizzle.json')], require('../../assets/weather_icons/wi-rain-mix.svg.png')],
  61: ['Slight rain', [require('../../assets/rain.json'), require('../../assets/rain.json')], require('../../assets/weather_icons/wi-rain.svg.png')],
  63: ['Moderate rain', [require('../../assets/rain.json'), require('../../assets/rain.json')], require('../../assets/weather_icons/wi-rain.svg.png')],
  65: ['Heavy rain', [require('../../assets/rain.json'), require('../../assets/rain.json')], require('../../assets/weather_icons/wi-rain.svg.png')],
  66: ['Light freezing rain', [require('../../assets/freezing_drizzle.json'), require('../../assets/freezing_drizzle.json')], require('../../assets/weather_icons/wi-snow-wind.svg.png')],
  67: ['Heavy freezing rain', [require('../../assets/freezing_drizzle.json'), require('../../assets/freezing_drizzle.json')], require('../../assets/weather_icons/wi-snow-wind.svg.png')],
  71: ['Slight snow fall', [require('../../assets/snowing.json'), require('../../assets/snowing.json')], require('../../assets/weather_icons/wi-snow.svg.png')],
  73: ['Moderate snow fall', [require('../../assets/snowing.json'), require('../../assets/snowing.json')], require('../../assets/weather_icons/wi-snow.svg.png')],
  75: ['Heavy snow fall', [require('../../assets/snowing.json'), require('../../assets/snowing.json')], require('../../assets/weather_icons/wi-snow.svg.png')],
  77: ['Snow grains', [require('../../assets/snowing.json'), require('../../assets/snowing.json')], require('../../assets/weather_icons/wi-snowflake-cold.svg.png')],
  80: ['Slight rain showers', [require('../../assets/rain.json'), require('../../assets/rain.json')], require('../../assets/weather_icons/wi-showers.svg.png')],
  81: ['Moderate rain showers', [require('../../assets/rain.json'), require('../../assets/rain.json')], require('../../assets/weather_icons/wi-showers.svg.png')],
  82: ['Heavy rain showers', [require('../../assets/rain.json'), require('../../assets/rain.json')], require('../../assets/weather_icons/wi-showers.svg.png')],
  85: ['Slight snow showers', [require('../../assets/snowing.json'), require('../../assets/snowing.json')], require('../../assets/weather_icons/wi-snow.svg.png')],
  86: ['Moderate snow showers', [require('../../assets/snowing.json'), require('../../assets/snowing.json')], require('../../assets/weather_icons/wi-snow.svg.png')],
  95: ['Thunderstorm', [require('../../assets/lightning.json'), require('../../assets/lightning.json')], require('../../assets/weather_icons/wi-storm-showers.svg.png')],
  96: ['Slight thunderstorm with hail', [require('../../assets/lightning.json'), require('../../assets/lightning.json')], require('../../assets/weather_icons/wi-storm-showers.svg.png')],
  99: ['Heavy thunderstorm with hail', [require('../../assets/lightning.json'), require('../../assets/lightning.json')], require('../../assets/weather_icons/wi-storm-showers.svg.png')],
};

export default WEATHER_CODES;