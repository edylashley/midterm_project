import axios from 'axios';

const API_URL = 'https://nationnode.vercel.app/api';

export const fetchCountries = async () => {
  const response = await axios.get(`${API_URL}/countries`);
  return response.data;
};

export const fetchCountryByName = async (name) => {
  const response = await axios.get(`${API_URL}/countries/${name}`);
  return response.data;
};