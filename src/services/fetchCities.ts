import axios from 'axios';

export const fetchCities = async (apiKey: string, city: string) => {
  const result = await axios.get(
    ` https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${city}`
  );

  return result.data;
};
