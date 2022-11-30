import { HiSearch } from 'react-icons/hi';
import { CountryCard } from '../components/CountryCard';
import { Country } from '../@types/Country';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState<Country[] | []>([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  const filteredByRegion = useMemo(() => (
    countries.filter((country) => country.region === selectedRegion)
  ), [countries, selectedRegion]);

  const filteredCountries = useMemo(() => {
    if (filteredByRegion.length > 0) {
      return filteredByRegion.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return countries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [countries, filteredByRegion, searchTerm]);

  const fetchCountries = useCallback(async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');

    const { data } = response;

    const mappedData : Country[] = data.map((item) => ({
      code: item.cca2,
      name: item.name.common,
      nativeName: item.name.nativeName ? item.name.nativeName[Object.keys(item.name.nativeName)[0]].common : '',
      flagURL: item.flags.png,
      population: item.population,
      region: item.region,
      subRegion: item.subregion,
      capital: item.capital ? item.capital[0] : '',
      topLevelDomain: item.tld ? item.tld[0] : '',
      languages: item.languages,
      currencies: item.currencies,
      borderCountriesCodes: item.borders,
    }));

    setCountries(mappedData);
  }, []);

  useEffect(() => {
    try {
      fetchCountries();
    } catch (err) {
      console.log(err);
    }
  }, [fetchCountries]);

  return (
    <main className="px-4 md:px-16 py-10">
      <header className="flex items-center justify-between flex-wrap">
        <label htmlFor="search" className="bg-white dark:bg-brand-blue-700 flex items-center gap-4 rounded-md h-12 w-full md:w-96 px-6 shadow-sm">
          <HiSearch className="text-brand-gray-dark dark:text-brand-gray-light" size={18}/>
          <input
            type="text"
            id="search"
            className="bg-transparent placeholder:dark:text-brand-gray-light placeholder:text-sm h-12 w-96 outline-none dark:text-brand-gray-light"
            placeholder="Search for a country..."
            maxLength={32}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </label>
        {/* border-r -> little trick to pad select arrow right */}
        <select className="dark:text-brand-gray-light dark:bg-brand-blue-700 h-11 w-48 px-4 text-sm rounded-md font-semibold shadow-sm border-r-8 border-r-transparent mt-8 md:mt-0" onChange={(e) => setSelectedRegion(e.target.value)} defaultValue="">
          <option>Filter by Region</option>
          {REGIONS.map((region) => (
            <option key={region}>{region}</option>
          ))}
        </select>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mt-8 place-items-center">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.code}
            country={country}
          />
        ))}
      </div>
    </main>
  );
}
