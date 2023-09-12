import axios from 'axios';
import { Result } from '../model/citiesProps';

const APIKEY = import.meta.env.VITE_API_KEY;

export const fetchCities = async (city: string) => {
  const result = await axios.get(
    ` https://api.opencagedata.com/geocode/v1/json?key=${APIKEY}&q=${city}`
  );

  const resultsOnlyCities = result.data.results.filter(
    (result: Result) =>
      result.components._type === 'city' ||
      result.components._type === 'village'
  );

  return resultsOnlyCities;
};
