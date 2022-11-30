import { useEffect, useState, useMemo } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { Country } from '../@types/Country';
import api from '../services/api';
import formatNumber from '../utils/formatNumber';

export function Details() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);

  const formattedPopulation = formatNumber(country?.population as number);

  const currencies = useMemo(() => {
    if (country?.currencies) {
      return Object.values(country?.currencies).map(currency => currency.name).join(', ');
    }
  }, [country]);

  const languages = useMemo(() => {
    if (country?.languages) {
      return Object.values(country?.languages).join(', ');
    }
  }, [country]);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await api.get(`/alpha/${code}`);
        const [data] = response.data;

        const mappedCountry : Country = {
          cca2: data.cca2,
          name: data.name.common,
          nativeName: data.name.nativeName ? data.name.nativeName[Object.keys(data.name.nativeName)[0]].common : '',
          flagURL: data.flags.svg,
          population: data.population,
          region: data.region,
          subRegion: data.subregion,
          capital: data.capital ? data.capital[0] : '',
          topLevelDomain: data.tld ? data.tld[0] : '',
          languages: data.languages,
          currencies: data.currencies,
          borderCountriesCodes: data.borders,
        };

        const countriesCodes = mappedCountry.borderCountriesCodes?.join(',');

        if (countriesCodes) {
          const response2 = await api.get(`/alpha?codes=${countriesCodes}`);

          const borderCountriesData = response2.data;

          const mappedBorderCountries = borderCountriesData.map((country: { cca2: string; name: { common: string; }; }) => ({
            cca2: country.cca2,
            name: country.name.common,
          }));

          return setCountry({
            ...mappedCountry,
            borderCountries: mappedBorderCountries
          });
        }

        return setCountry({
          ...mappedCountry,
          borderCountries: []
        });
      } catch(err) {
        console.log(err);
        setCountry(null);
      }
    }
    fetchCountry();
  }, [code]);

  return (
    <main className="px-4 md:px-20 py-12">
      <button
        type="button"
        className="flex items-center justify-between gap-2
       bg-white dark:bg-brand-blue-700 dark:text-brand-gray-light py-2 px-8 shadow-md rounded-sm
       hover:bg-brand-gray-light dark:hover:bg-opacity-60 transition-all duration-300"
        onClick={() => navigate(-1)}
      >
        <HiArrowLeft size={16}/>
        <span>Back</span>
      </button>

      <div className="flex flex-col md:flex-row md:gap-36 mt-16 md:items-center md:h-[480px]">
        <div className="w-full md:w-1/2 h-full">
          <img
            className="w-full h-full object-cover"
            alt={country?.name}
            src={country?.flagURL}
          />
        </div>

        <div className="flex flex-col mt-12 md:mt-0 md:w-1/2 dark:text-brand-gray-light">
          <h2 className="text-xl md:text-3xl font-extrabold mb-8">{country?.name}</h2>

          <div className="flex flex-col md:flex-row md:gap-48">
            <section className="flex flex-col gap-2">
              <div className="inline-block">
                <span className="font-semibold">Native Name:</span>
                <span className="font-light"> { country?.nativeName }</span>
              </div>

              <div className="inline-block">
                <span className="font-semibold">Population:</span>
                <span className="font-light"> { formattedPopulation }</span>
              </div>

              <div className="inline-block">
                <span className="font-semibold">Region:</span>
                <span className="font-light"> { country?.region }</span>
              </div>

              <div className="inline-block">
                <span className="font-semibold">Sub Region:</span>
                <span className="font-light"> { country?.subRegion }</span>
              </div>

              <div className="inline-block">
                <span className="font-semibold">Capital:</span>
                <span className="font-light"> { country?.capital }</span>
              </div>
            </section>

            <section className="flex flex-col gap-2 mt-12 md:mt-0">
              <div className="inline-block">
                <span className="font-semibold">Top Level Domain:</span>
                <span className="font-light"> { country?.topLevelDomain }</span>
              </div>

              <div className="inline-block">
                <span className="font-semibold">Currencies:</span>
                <span className="font-light"> { currencies }</span>
              </div>

              <div className="inline-block">
                <span className="font-semibold">Languages:</span>
                <span className="font-light"> { languages }</span>
              </div>
            </section>
          </div>

          {country?.borderCountries?.length ? (
            <div className="flex flex-col md:flex-row md:items-center mt-12">
              <span className="font-semibold mr-4">Border Countries:</span>
              <div className="grid grid-cols-3 gap-2 mt-4 md:mt-0">
                {country?.borderCountries?.map((borderCountry) => (
                  <button
                    key={borderCountry.cca2}
                    type="button"
                    className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-center h-8 px-6 bg-white dark:bg-brand-blue-700 dark:text-brand-gray-light
                  shadow-md rounded-sm hover:bg-brand-gray-light dark:hover:bg-opacity-60
                  transition-all duration-300"
                    onClick={() => navigate(`/details/${borderCountry.cca2}`)}
                  >
                    {borderCountry.name}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
