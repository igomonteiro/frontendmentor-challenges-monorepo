import { useNavigate } from 'react-router-dom';
import { Country } from '../@types/Country';

interface ICountryCardProps {
  country: Country;
}

export function CountryCard({ country : { code, name, flagURL, population, region, capital } }: ICountryCardProps) {
  const formattedPopulation = Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(population);

  const navigate = useNavigate();
  function handleOnCardClick() {
    navigate(`/details/${code}`);
  }

  return (
    <div
      className="w-80 md:w-full flex flex-col
      dark:text-brand-gray-light dark:bg-brand-blue-700
      h-96 shadow-md rounded-md cursor-pointer hover:scale-105 transition-transform duration-300"
      onClick={handleOnCardClick}
    >
      <div className="w-full h-48">
        <img
          className="w-full h-full object-fill"
          alt={name}
          src={flagURL}
        />
      </div>

      <div className="flex flex-col p-8 gap-1 text-sm">
        <span className="font-extrabold mb-4 text-base"> { name }</span>

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