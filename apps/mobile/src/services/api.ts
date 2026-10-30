import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Default LAN IP for physical devices; override via app.json extra.lanIp.
const LAN_IP = (Constants.expoConfig?.extra as any)?.lanIp || '10.94.34.139';
const CONFIGURED_BASE = (Constants.expoConfig?.extra as any)?.apiBaseUrl;

export const API_BASE_URL =
  CONFIGURED_BASE ||
  (Platform.OS === 'android'
    ? 'http://10.0.2.2:4000/api'
    : Platform.OS === 'ios'
    ? 'http://localhost:4000/api'
    : `http://${LAN_IP}:4000/api`);

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
