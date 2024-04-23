export class LocationData {
  results?: Result[];
  generationtimeMs?: number;

  constructor(data?: { results?: Result[]; generationtimeMs?: number }) {
    this.results = data?.results;
    this.generationtimeMs = data?.generationtimeMs;
  }

  static fromJson(json: any): LocationData {
    return new LocationData({
      results: json.results?.map((v: any) => Result.fromJson(v)),
      generationtimeMs: json.generationtime_ms,
    });
  }

  toJson(): { [key: string]: any } {
    return {
      results: this.results?.map((v) => v.toJson()),
      generationtime_ms: this.generationtimeMs,
    };
  }
}

export class Result {
  id: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  elevation?: number;
  featureCode?: string;
  countryCode?: string;
  admin1Id?: number;
  admin3Id?: number;
  admin4Id?: number;
  timezone?: string;
  population?: number;
  countryId?: number;
  country?: string;
  admin1?: string;
  admin3?: string;
  admin4?: string;
  admin2Id?: number;
  admin2?: string;

  constructor(data?: {
    id?: number;
    name?: string;
    latitude?: number;
    longitude?: number;
    elevation?: number;
    featureCode?: string;
    countryCode?: string;
    admin1Id?: number;
    admin3Id?: number;
    admin4Id?: number;
    timezone?: string;
    population?: number;
    countryId?: number;
    country?: string;
    admin1?: string;
    admin3?: string;
    admin4?: string;
    admin2Id?: number;
    admin2?: string;
  }) {
    this.id = data?.id ?? -1;
    this.name = data?.name;
    this.latitude = data?.latitude;
    this.longitude = data?.longitude;
    this.elevation = data?.elevation;
    this.featureCode = data?.featureCode;
    this.countryCode = data?.countryCode;
    this.admin1Id = data?.admin1Id;
    this.admin3Id = data?.admin3Id;
    this.admin4Id = data?.admin4Id;
    this.timezone = data?.timezone;
    this.population = data?.population;
    this.countryId = data?.countryId;
    this.country = data?.country;
    this.admin1 = data?.admin1;
    this.admin3 = data?.admin3;
    this.admin4 = data?.admin4;
    this.admin2Id = data?.admin2Id;
    this.admin2 = data?.admin2;
  }

  static fromJson(json: any): Result {
    return new Result({
      id: json.id,
      name: json.name,
      latitude: json.latitude,
      longitude: json.longitude,
      elevation: json.elevation,
      featureCode: json.feature_code,
      countryCode: json.country_code,
      admin1Id: json.admin1_id,
      admin3Id: json.admin3_id,
      admin4Id: json.admin4_id,
      timezone: json.timezone,
      population: json.population,
      countryId: json.country_id,
      country: json.country,
      admin1: json.admin1,
      admin3: json.admin3,
      admin4: json.admin4,
      admin2Id: json.admin2_id,
      admin2: json.admin2,
    });
  }

  toJson(): { [key: string]: any } {
    return {
      id: this.id,
      name: this.name,
      latitude: this.latitude,
      longitude: this.longitude,
      elevation: this.elevation,
      feature_code: this.featureCode,
      country_code: this.countryCode,
      admin1_id: this.admin1Id,
      admin3_id: this.admin3Id,
      admin4_id: this.admin4Id,
      timezone: this.timezone,
      population: this.population,
      country_id: this.countryId,
      country: this.country,
      admin1: this.admin1,
      admin3: this.admin3,
      admin4: this.admin4,
      admin2_id: this.admin2Id,
      admin2: this.admin2,
    };
  }
}

