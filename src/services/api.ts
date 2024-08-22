import axios from 'axios';
import {API_BASE_URL} from '@env';

const api = axios.create({
  baseURL: API_BASE_URL || 'http://10.0.2.2:3000',
  timeout: 10000,
});

export default api;
