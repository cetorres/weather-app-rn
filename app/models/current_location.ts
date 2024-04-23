export class CurrentLocation {
  name?: string;
  city?: string;
  latitude?: number;
  longitude?: number;

  constructor(name: string, city: string, latitude: number, longitude: number) {
    this.name = name;
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  toJSONString(): string {
    const data: { [key: string]: any } = {
      name: this.name,
      latitude: this.latitude,
      longitude: this.longitude,
    };
    return JSON.stringify(data);
  }

  static fromJSONString(jsonString: string): CurrentLocation {
    const data = JSON.parse(jsonString);
    return new CurrentLocation(data.name, data.city, data.latitude, data.longitude);
  }
}

