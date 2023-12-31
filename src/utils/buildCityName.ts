import { Components } from '../model/citiesProps';

const valuesAttribute: cityType[] = [
  'country',
  'county',
  'city',
  'town',
  'village',
];

export const buildCityNameFromResultComponents = (result: Components) =>
  valuesAttribute
    .reduce((state, value) => {
      if (result[value]) {
        return state + '_' + result[value]!;
      }
      return state;
    }, '')
    .replace(/^_/, '');
