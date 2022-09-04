import Axios from 'axios';
import { cookieAuthService } from './cookie-auth-service';

export const httpService = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const httpServiceWithAuth = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${cookieAuthService.getAccessToken() || ''}`,
  }
});
