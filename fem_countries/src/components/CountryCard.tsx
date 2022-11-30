import { useNavigate } from 'react-router-dom';
import { Country } from '../@types/Country';
import formatNumber from '../utils/formatNumber';

interface ICountryCardProps {
  country: Country;
}

export function CountryCard({ country : { cca2, name, flagURL, population, region, capital } }: ICountryCardProps) {
  const formattedPopulation = formatNumber(population);

  const navigate = useNavigate();
  function handleOnCardClick() {
    navigate(`/details/${cca2}`);
  }

  return (
    <div
      className="w-80 md:w-full flex flex-col bg-white dark:text-brand-gray-light dark:bg-brand-blue-700
      h-[340px] shadow-md rounded-md cursor-pointer hover:scale-105 transition-transform duration-300"
      onClick={handleOnCardClick}
    >
      <div className="w-full h-40">
        <img
          className="w-full h-full object-fill rounded-t-md"
          alt={name}
          src={flagURL}
        />
      </div>

      <div className="flex flex-col px-8 py-5 gap-1 text-sm">
        <span className="font-extrabold mb-2 text-base"> { name }</span>

        <div className="inline-block">
          <span className="font-semibold">Population:</span>
          <span className="font-light"> { formattedPopulation }</span>
        </div>

        <div className="inline-block">
          <span className="font-semibold">Region:</span>
          <span className="font-light"> { region }</span>
        </div>

        <div className="inline-block">
          <span className="font-semibold">Capital:</span>
          <span className="font-light"> { capital }</span>
        </div>
      </div>
    </div>
  );
}
