import axios from 'axios';
import { Platform } from 'react-native';

// Change this to your computer's LAN IP when running on a physical device.
const LAN_IP = "10.94.34.139";

export const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:4000/api'
    : Platform.OS === 'ios'
    ? 'http://localhost:4000/api'
    : `http://${LAN_IP}:4000/api`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err?.response?.data?.message || err?.message || 'Network error';
    return Promise.reject(new Error(message));
  }
);
