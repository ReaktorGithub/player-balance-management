import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://dev-space.su/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
