import axios from 'axios';
import { Result } from '../model/CitiesProps';

export const fetchCities = async (apiKey: string, city: string) => {
  const result = await axios.get(
    ` https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${city}`
  );

  const resultsOnlyCities = result.data.results.filter(
    (result: Result) =>
      result.components._type === 'city' ||
      result.components._type === 'village'
  );

  return resultsOnlyCities;
};
