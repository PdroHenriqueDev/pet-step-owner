import axios from 'axios';
import {API_BASE_URL} from '@env';

const api = axios.create({
  baseURL: 'http://192.168.0.13:3000',
  timeout: 10000,
});

export default api;
