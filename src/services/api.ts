import axios from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: 'https://api.petstepapp.com/',
  // baseURL: 'https://api.petstepapp.com',
  timeout: 10000,
});

export default api;
