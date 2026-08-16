import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export async function fetchProperties(params = {}) {
  const response = await api.get('/properties', {
    params: {
      limit: params.limit || 20,
      offset: params.offset || 0,
      ...params,
    },
  });

  return response.data;
}

export async function fetchProperty(id) {
  const response = await api.get(`/properties/${id}`);
  return response.data;
}

export async function fetchOpenHouses() {
  const response = await api.get('/openhouses');
  return response.data;
}

export default api;