
export class WeatherData {
  latitude?: number;
  longitude?: number;
  generationtimeMs?: number;
  utcOffsetSeconds?: number;
  timezone?: string;
  timezoneAbbreviation?: string;
  elevation?: number;
  currentUnits?: CurrentUnits;
  current?: Current;
  hourlyUnits?: HourlyUnits;
  hourly?: Hourly;
  dailyUnits?: DailyUnits;
  daily?: Daily;

  constructor(
    latitude?: number,
    longitude?: number,
    generationtimeMs?: number,
    utcOffsetSeconds?: number,
    timezone?: string,
    timezoneAbbreviation?: string,
    elevation?: number,
    currentUnits?: CurrentUnits,
    current?: Current,
    hourlyUnits?: HourlyUnits,
    hourly?: Hourly,
    dailyUnits?: DailyUnits,
    daily?: Daily
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.generationtimeMs = generationtimeMs;
    this.utcOffsetSeconds = utcOffsetSeconds;
    this.timezone = timezone;
    this.timezoneAbbreviation = timezoneAbbreviation;
    this.elevation = elevation;
    this.currentUnits = currentUnits;
    this.current = current;
    this.hourlyUnits = hourlyUnits;
    this.hourly = hourly;
    this.dailyUnits = dailyUnits;
    this.daily = daily;
  }

  static fromJSON(json: any): WeatherData {
    return new WeatherData(
      json.latitude,
      json.longitude,
      json.generationtime_ms,
      json.utc_offset_seconds,
      json.timezone,
      json.timezone_abbreviation,
      json.elevation,
      json.current_units ? CurrentUnits.fromJson(json.current_units) : undefined,
      json.current ? Current.fromJson(json.current) : undefined,
      json.hourly_units ? HourlyUnits.fromJson(json.hourly_units) : undefined,
      json.hourly ? Hourly.fromJson(json.hourly) : undefined,
      json.daily_units ? DailyUnits.fromJson(json.daily_units) : undefined,
      json.daily ? Daily.fromJson(json.daily) : undefined
    );
  }

  toJSON(): any {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      generationtime_ms: this.generationtimeMs,
      utc_offset_seconds: this.utcOffsetSeconds,
      timezone: this.timezone,
      timezone_abbreviation: this.timezoneAbbreviation,
      elevation: this.elevation,
      current_units: this.currentUnits?.toJson(),
      current: this.current?.toJson(),
      hourly_units: this.hourlyUnits?.toJson(),
      hourly: this.hourly?.toJson(),
      daily_units: this.dailyUnits?.toJson(),
      daily: this.daily?.toJson()
    };
  }

  toJSONString(): any {
    return JSON.stringify({
      latitude: this.latitude,
      longitude: this.longitude,
      generationtime_ms: this.generationtimeMs,
      utc_offset_seconds: this.utcOffsetSeconds,
      timezone: this.timezone,
      timezone_abbreviation: this.timezoneAbbreviation,
      elevation: this.elevation,
      current_units: this.currentUnits?.toJson(),
      current: this.current?.toJson(),
      hourly_units: this.hourlyUnits?.toJson(),
      hourly: this.hourly?.toJson(),
      daily_units: this.dailyUnits?.toJson(),
      daily: this.daily?.toJson()
    });
  }
}

export class CurrentUnits {
  time?: string;
  interval?: string;
  temperature2m?: string;
  relativeHumidity2m?: string;
  isDay?: string;
  precipitation?: string;
  rain?: string;
  showers?: string;
  snowfall?: string;
  windSpeed10m?: string;
  weatherCode?: string;

  constructor(
    time?: string,
    interval?: string,
    temperature2m?: string,
    relativeHumidity2m?: string,
    isDay?: string,
    precipitation?: string,
    rain?: string,
    showers?: string,
    snowfall?: string,
    windSpeed10m?: string,
    weatherCode?: string
  ) {
    this.time = time;
    this.interval = interval;
    this.temperature2m = temperature2m;
    this.relativeHumidity2m = relativeHumidity2m;
    this.isDay = isDay;
    this.precipitation = precipitation;
    this.rain = rain;
    this.showers = showers;
    this.snowfall = snowfall;
    this.windSpeed10m = windSpeed10m;
    this.weatherCode = weatherCode;
  }

  static fromJson(json: any): CurrentUnits {
    return new CurrentUnits(
      json.time,
      json.interval,
      json['temperature_2m'],
      json['relative_humidity_2m'],
      json['is_day'],
      json.precipitation,
      json.rain,
      json.showers,
      json.snowfall,
      json['wind_speed_10m']
    );
  }

  toJson(): any {
    return {
      time: this.time,
      interval: this.interval,
      temperature_2m: this.temperature2m,
      relative_humidity_2m: this.relativeHumidity2m,
      is_day: this.isDay,
      precipitation: this.precipitation,
      rain: this.rain,
      showers: this.showers,
      snowfall: this.snowfall,
      wind_speed_10m: this.windSpeed10m
    };
  }
}

export class Current {
  time?: number;
  interval?: number;
  temperature2m?: number;
  relativeHumidity2m?: number;
  isDay?: number;
  precipitation?: number;
  rain?: number;
  showers?: number;
  snowfall?: number;
  windSpeed10m?: number;
  weatherCode?: number;

  constructor(
    time?: number,
    interval?: number,
    temperature2m?: number,
    relativeHumidity2m?: number,
    isDay?: number,
    precipitation?: number,
    rain?: number,
    showers?: number,
    snowfall?: number,
    windSpeed10m?: number,
    weatherCode?: number
  ) {
    this.time = time;
    this.interval = interval;
    this.temperature2m = temperature2m;
    this.relativeHumidity2m = relativeHumidity2m;
    this.isDay = isDay;
    this.precipitation = precipitation;
    this.rain = rain;
    this.showers = showers;
    this.snowfall = snowfall;
    this.windSpeed10m = windSpeed10m;
    this.weatherCode = weatherCode;
  }

  static fromJson(json: any): Current {
    return new Current(
      json.time,
      json.interval,
      json['temperature_2m'],
      json['relative_humidity_2m'],
      json['is_day'],
      json.precipitation,
      json.rain,
      json.showers,
      json.snowfall,
      json['wind_speed_10m'],
      json['weather_code']
    );
  }

  toJson(): any {
    return {
      time: this.time,
      interval: this.interval,
      temperature_2m: this.temperature2m,
      relative_humidity_2m: this.relativeHumidity2m,
      is_day: this.isDay,
      precipitation: this.precipitation,
      rain: this.rain,
      showers: this.showers,
      snowfall: this.snowfall,
      wind_speed_10m: this.windSpeed10m
    };
  }
}

export class HourlyUnits {
  time?: string;
  temperature2m?: string;
  relativeHumidity2m?: string;
  rain?: string;
  showers?: string;
  snowfall?: string;
  windSpeed10m?: string;
  weatherCode?: string;

  constructor(
    time?: string,
    temperature2m?: string,
    relativeHumidity2m?: string,
    rain?: string,
    showers?: string,
    snowfall?: string,
    windSpeed10m?: string,
    weatherCode?: string
  ) {
    this.time = time;
    this.temperature2m = temperature2m;
    this.relativeHumidity2m = relativeHumidity2m;
    this.rain = rain;
    this.showers = showers;
    this.snowfall = snowfall;
    this.windSpeed10m = windSpeed10m;
    this.weatherCode = weatherCode;
  }

  static fromJson(json: any): HourlyUnits {
    return new HourlyUnits(
      json.time,
      json['temperature_2m'],
      json['relative_humidity_2m'],
      json.rain,
      json.showers,
      json.snowfall,
      json['wind_speed_10m'],
      json['weather_code']
    );
  }

  toJson(): any {
    return {
      time: this.time,
      temperature_2m: this.temperature2m,
      relative_humidity_2m: this.relativeHumidity2m,
      rain: this.rain,
      showers: this.showers,
      snowfall: this.snowfall,
      wind_speed_10m: this.windSpeed10m,
      weather_code: this.weatherCode
    };
  }
}

export class Hourly {
  time?: number[];
  temperature2m?: number[];
  relativeHumidity2m?: number[];
  rain?: number[];
  showers?: number[];
  snowfall?: number[];
  windSpeed10m?: number[];
  weatherCode?: number[];

  constructor(
    time?: number[],
    temperature2m?: number[],
    relativeHumidity2m?: number[],
    rain?: number[],
    showers?: number[],
    snowfall?: number[],
    windSpeed10m?: number[],
    weatherCode?: number[]
  ) {
    this.time = time;
    this.temperature2m = temperature2m;
    this.relativeHumidity2m = relativeHumidity2m;
    this.rain = rain;
    this.showers = showers;
    this.snowfall = snowfall;
    this.windSpeed10m = windSpeed10m;
    this.weatherCode = weatherCode;
  }

  static fromJson(json: any): Hourly {
    return new Hourly(
      json.time,
      json['temperature_2m'],
      json['relative_humidity_2m'],
      json.rain,
      json.showers,
      json.snowfall,
      json['wind_speed_10m'],
      json['weather_code']
    );
  }

  toJson(): any {
    return {
      time: this.time,
      temperature_2m: this.temperature2m,
      relative_humidity_2m: this.relativeHumidity2m,
      rain: this.rain,
      showers: this.showers,
      snowfall: this.snowfall,
      wind_speed_10m: this.windSpeed10m,
      weather_code: this.weatherCode
    };
  }
}

export class DailyUnits {
  time?: string;
  temperature2mMax?: string;
  temperature2mMin?: string;
  weatherCode?: string;

  constructor(
    time?: string,
    temperature2mMax?: string,
    temperature2mMin?: string,
    weatherCode?: string
  ) {
    this.time = time;
    this.temperature2mMax = temperature2mMax;
    this.temperature2mMin = temperature2mMin;
    this.weatherCode = weatherCode;
  }

  static fromJson(json: any): DailyUnits {
    return new DailyUnits(
      json.time,
      json['temperature_2m_max'],
      json['temperature_2m_min'],
      json['weather_code']
    );
  }

  toJson(): any {
    return {
      time: this.time,
      temperature_2m_max: this.temperature2mMax,
      temperature_2m_min: this.temperature2mMin,
      weather_code: this.weatherCode
    };
  }
}

export class Daily {
  time?: number[];
  temperature2mMax?: number[];
  temperature2mMin?: number[];
  weatherCode?: number[];

  constructor(
    time?: number[],
    temperature2mMax?: number[],
    temperature2mMin?: number[],
    weatherCode?: number[]
  ) {
    this.time = time;
    this.temperature2mMax = temperature2mMax;
    this.temperature2mMin = temperature2mMin;
    this.weatherCode = weatherCode;
  }

  static fromJson(json: any): Daily {
    return new Daily(
      json.time,
      json['temperature_2m_max'],
      json['temperature_2m_min'],
      json['weather_code']
    );
  }

  toJson(): any {
    return {
      time: this.time,
      temperature_2m_max: this.temperature2mMax,
      temperature_2m_min: this.temperature2mMin,
      weather_code: this.weatherCode
    };
  }
}

