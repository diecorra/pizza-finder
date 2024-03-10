import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { CitiesProps, DataApiCity } from 'model/citiesProps';

const APIKEY = import.meta.env.VITE_API_KEY;

export const useFetchCities = (city: string) => {
  return useQuery<DataApiCity[], AxiosError<any, any>>(
    ['city'],
    () => fetchCities(city),
    { enabled: false }
  );
};

export const fetchCities = async (city: string) => {
  const result = await axios.get<CitiesProps>(
    ` https://api.opencagedata.com/geocode/v1/json?key=${APIKEY}&q=${city}`
  );
  const filteredCityAndVillageResults = result.data?.results.filter(
    (result: DataApiCity) => filterCityAndVillage(result.components._type)
  );

  return filteredCityAndVillageResults;
};

const filterCityAndVillage = (type: string) =>
  type === 'city' || type === 'village';
