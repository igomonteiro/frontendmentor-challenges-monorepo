export type Country = {
  cca2: string;
  name: string;
  nativeName: string;
  flagURL: string;
  population: number;
  region: string;
  subRegion: string;
  capital: string;
  topLevelDomain: string;
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    }
  };
  borderCountriesCodes: string[];
  borderCountries?: {
    cca2: string;
    name: string;
  }[];
}
