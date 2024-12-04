export interface Country {
  flags: { png: string };
  name: { official: string; nativeName: { [key: string]: { common: string } } };
  cca2: string;
  cca3: string;
  region: string;
  subregion: string;
  altSpellings: string[];
  tld: string[];
  capital: string[];
  timezones: string[];
  latlng?: [number, number];
  area: number;
  population: number;
  car?: { signs: string[]; side: string; };
  maps?: { googleMaps: string; openStreetMaps: string; };
  currencies?: { [code: string]: {code: string, name: string, symbol: string} };
  languages?: { [code: string]: string };
  idd: { root: string; suffixes: string[] };
  nativeName?: string;
}
