/**
 * Dutch region → PVGIS coordinate mapping.
 * Each entry maps a region/province/city name to lat/lon coordinates
 * suitable for PVGIS API queries.
 */
export interface RegionCoord {
  name: string;
  lat: number;
  lon: number;
  /** Average solar irradiation in kWh/m²/year (used for rough estimates pre-API) */
  avgKwhPerKwp: number;
}

export const REGIONS: RegionCoord[] = [
  { name: "Nederland (centraal)", lat: 52.1, lon: 5.3, avgKwhPerKwp: 975 },
  { name: "Groningen", lat: 53.22, lon: 6.57, avgKwhPerKwp: 960 },
  { name: "Fryslân", lat: 53.16, lon: 5.83, avgKwhPerKwp: 965 },
  { name: "Drenthe", lat: 52.95, lon: 6.62, avgKwhPerKwp: 960 },
  { name: "Overijssel", lat: 52.44, lon: 6.45, avgKwhPerKwp: 970 },
  { name: "Flevoland", lat: 52.53, lon: 5.48, avgKwhPerKwp: 975 },
  { name: "Gelderland", lat: 52.05, lon: 5.87, avgKwhPerKwp: 970 },
  { name: "Utrecht", lat: 52.09, lon: 5.12, avgKwhPerKwp: 975 },
  { name: "Noord-Holland", lat: 52.55, lon: 4.75, avgKwhPerKwp: 980 },
  { name: "Zuid-Holland", lat: 52.0, lon: 4.5, avgKwhPerKwp: 980 },
  { name: "Zeeland", lat: 51.5, lon: 3.7, avgKwhPerKwp: 985 },
  { name: "Noord-Brabant", lat: 51.6, lon: 5.0, avgKwhPerKwp: 975 },
  { name: "Limburg", lat: 51.2, lon: 5.9, avgKwhPerKwp: 970 },
  { name: "Amsterdam", lat: 52.37, lon: 4.89, avgKwhPerKwp: 980 },
  { name: "Rotterdam", lat: 51.92, lon: 4.48, avgKwhPerKwp: 980 },
  { name: "Den Haag", lat: 52.08, lon: 4.31, avgKwhPerKwp: 980 },
  { name: "Utrecht Stad", lat: 52.09, lon: 5.12, avgKwhPerKwp: 975 },
  { name: "Eindhoven", lat: 51.44, lon: 5.48, avgKwhPerKwp: 975 },
  { name: "Maastricht", lat: 50.85, lon: 5.69, avgKwhPerKwp: 970 },
  { name: "Groningen Stad", lat: 53.22, lon: 6.57, avgKwhPerKwp: 960 },
];
