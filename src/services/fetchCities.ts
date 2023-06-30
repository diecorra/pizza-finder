import axios from 'axios';

export const fetchCities = async () => {
  const apiKey = 'd8bb63d3a1f7498e9d40f207eea57619';
  const city = 'Verona';
  const result = await axios.get(
    ` https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${city}`
  );
  console.log(result.data);

  return result.data;
};
