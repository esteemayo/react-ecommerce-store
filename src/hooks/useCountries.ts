import countries from 'world-countries';

const formatCountries = countries.map((item) => ({
  flag: item.flag,
  label: item.name.common,
}));

export const useCountries = () => {
  const getAll = () => formatCountries;

  return { getAll };
}
