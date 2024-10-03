import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: Config.API_BASE_URL || 'http://10.0.2.2:3000',
  timeout: 10000,
});

export default api;
